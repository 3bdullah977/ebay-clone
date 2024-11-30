import { pgTable, serial, varchar, text, timestamp } from "drizzle-orm/pg-core";
import { InferSelectModel, sql } from "drizzle-orm";

export const users = pgTable("users", {
  userId: serial("user_id").primaryKey(),
  username: varchar("username", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  role: text("role", { enum: ["seller", "buyer"] }).notNull(),
  profileImageUrl: text("profile_image_url"),
  createdAt: timestamp("created_at", { withTimezone: true }).default(
    sql`CURRENT_TIMESTAMP`
  ),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => new Date()),
});

export type SelectUser = InferSelectModel<typeof users>;
