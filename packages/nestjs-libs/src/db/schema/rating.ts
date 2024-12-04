import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./user";
import { relations, sql } from "drizzle-orm";

export const ratings = pgTable("ratings", {
  ratingId: serial("rating_id").primaryKey(),
  sellerId: integer("seller_id")
    .references(() => users.userId)
    .notNull(),
  buyerId: integer("buyer_id")
    .references(() => users.userId)
    .notNull(),
  rating: integer("rating").notNull(),
  review: text("review").notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const ratingsRelations = relations(ratings, ({ one }) => ({
  seller: one(users, {
    fields: [ratings.sellerId],
    references: [users.userId],
  }),
  buyer: one(users, {
    fields: [ratings.buyerId],
    references: [users.userId],
  }),
}));

export const addRatingCheckConstraint = sql`
  ALTER TABLE "ratings"
  ADD CONSTRAINT "check_rating_range"
  CHECK (rating BETWEEN 1 AND 5);
`;
