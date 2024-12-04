import {
  pgTable,
  serial,
  integer,
  decimal,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import { users } from "./user";
import { products } from "./product";
import { shipping } from "./shipping";

export const transactions = pgTable("Transactions", {
  transactionId: serial("transaction_id").primaryKey(),
  buyerId: integer("buyer_id")
    .notNull()
    .references(() => users.userId),
  productId: integer("product_id")
    .notNull()
    .references(() => products.productId),
  amountPaid: decimal("amount_paid", { precision: 10, scale: 2 }).notNull(),
  status: text("status", {
    enum: ["pending", "completed", "shipped", "delivered"],
  })
    .notNull()
    .default("pending"),
  createdAt: timestamp("created_at", { withTimezone: true }).default(
    sql`CURRENT_TIMESTAMP`
  ),
});

export const transactionsRelations = relations(
  transactions,
  ({ one, many }) => ({
    buyer: one(users, {
      fields: [transactions.buyerId],
      references: [users.userId],
    }),
    product: one(products, {
      fields: [transactions.productId],
      references: [products.productId],
    }),
    shippings: many(shipping),
  })
);
