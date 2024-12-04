import {
  pgTable,
  serial,
  integer,
  varchar,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import { transactions } from "./transaction";

export const shipping = pgTable("shipping", {
  shippingId: serial("shipping_id").primaryKey(),
  transactionId: integer("transaction_id")
    .notNull()
    .references(() => transactions.transactionId),
  trackingNumber: varchar("tracking_number", { length: 255 }),
  shippingStatus: text("shipping_status", { enum: ["in_transit", "delivered"] })
    .notNull()
    .default("in_transit"),
  estimatedDelivery: timestamp("estimated_delivery", { withTimezone: true }),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => new Date()),
});

export const shippingRelations = relations(shipping, ({ one }) => ({
  transaction: one(transactions, {
    fields: [shipping.transactionId],
    references: [transactions.transactionId],
  }),
}));
