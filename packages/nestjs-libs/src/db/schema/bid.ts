// CREATE TABLE Bids (
//     bid_id SERIAL PRIMARY KEY,
//     product_id INT REFERENCES Products(product_id),
//     buyer_id INT REFERENCES Users(user_id),
//     bid_amount DECIMAL(10, 2) NOT NULL,
//     bid_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );
//

import {
  decimal,
  integer,
  pgTable,
  serial,
  timestamp,
} from "drizzle-orm/pg-core";
import { products } from "./product";
import { users } from "./user";
import { InferSelectModel, relations, sql } from "drizzle-orm";

export const bids = pgTable("bids", {
  bidId: serial("bid_id").primaryKey(),
  productId: integer("product_id")
    .references(() => products.productId)
    .notNull(),
  buyerId: integer("buyer_id")
    .references(() => users.userId)
    .notNull(),
  bidAmount: decimal("bid_amount").notNull().default("0"),
  bidTime: timestamp("bid_time").default(sql`CURRENT_TIMESTAMP`),
});

export const bidsRelations = relations(bids, ({ one }) => ({
  buyer: one(users, {
    fields: [bids.buyerId],
    references: [users.userId],
  }),
  product: one(products, {
    fields: [bids.productId],
    references: [products.productId],
  }),
}));

export type SelectBid = InferSelectModel<typeof bids>;
