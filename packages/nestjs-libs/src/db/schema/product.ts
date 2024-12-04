import {
  boolean,
  decimal,
  index,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { users } from "./user";
import { InferSelectModel, relations, sql } from "drizzle-orm";
import { carts } from "./cart";
import { transactions } from "./transaction";
import { bids } from "./bid";

export const products = pgTable(
  "products",
  {
    productId: serial("product_id").primaryKey(),
    sellerId: integer("seller_id")
      .references(() => users.userId)
      .notNull(),
    title: text("title").notNull(),
    description: text("description").notNull().default(""),
    imageUrl: text("image_url").notNull().default(""),
    price: decimal("price", { precision: 10, scale: 2 }).notNull().default("0"),
    lowerPound: decimal("price", { precision: 10, scale: 2 })
      .notNull()
      .default("0"),
    isBiddable: boolean().notNull().default(false),
    bidTimer: timestamp("bid_timer"),
    createdAt: timestamp("created_at", { withTimezone: true }).default(
      sql`CURRENT_TIMESTAMP`
    ),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .$onUpdate(() => new Date()),
  },
  (table) => {
    return {
      titleDescriptionIdx: index("title_description_idx").on(
        table.title,
        table.description
      ),
    };
  }
);

export const productsRelations = relations(products, ({ one, many }) => ({
  seller: one(users, {
    fields: [products.sellerId],
    references: [users.userId],
  }),
  carts: many(carts),
  transactions: many(transactions),
  bids: many(bids),
}));

export type SelectProduct = InferSelectModel<typeof products>;
