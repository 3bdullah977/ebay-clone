import { pgTable, serial, varchar, text, timestamp } from "drizzle-orm/pg-core";
import { InferSelectModel, relations, sql } from "drizzle-orm";
import { products } from "./product";
import { bids } from "./bid";
import { carts } from "./cart";
import { transactions } from "./transaction";
import { notifications } from "./notification";
import { ratings } from "./rating";

export const users = pgTable("users", {
  userId: serial("user_id").primaryKey(),
  username: varchar("username", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  role: text("role", { enum: ["seller", "buyer"] }).notNull(),
  profileImageUrl: text("profile_image_url").notNull(),
  hashedRefreshToken: text("hashed_refresh_token").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).default(
    sql`CURRENT_TIMESTAMP`
  ),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => new Date()),
});

export const usersRelations = relations(users, ({ many }) => ({
  products: many(products),
  bids: many(bids),
  carts: many(carts),
  transactions: many(transactions),
  notifications: many(notifications),
  sellerRatings: many(ratings, { relationName: "seller_rating" }),
  buyerRatings: many(ratings, { relationName: "buyer_rating" }),
}));

export type SelectUser = InferSelectModel<typeof users>;
