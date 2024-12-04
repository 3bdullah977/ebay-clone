import { integer, pgTable, serial, timestamp } from "drizzle-orm/pg-core";
import { users } from "./user";
import { products } from "./product";
import { relations, sql } from "drizzle-orm";

export const carts = pgTable("carts", {
  cartId: serial("card_id").primaryKey(),
  buyerId: integer("buyer_id")
    .references(() => users.userId)
    .notNull(),
  productId: integer("product_id")
    .references(() => products.productId)
    .notNull(),
  quantity: integer("quantity").notNull().default(1),
  addedAt: timestamp("added_at").default(sql`CURRENT_TIMESTAMP`),
});

export const cartsRelations = relations(carts, ({ one }) => ({
  buyer: one(users, {
    fields: [carts.buyerId],
    references: [users.userId],
  }),
  product: one(products, {
    fields: [carts.productId],
    references: [products.productId],
  }),
}));
