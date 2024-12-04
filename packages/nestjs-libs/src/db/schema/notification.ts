import {
  integer,
  pgTable,
  serial,
  text,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { users } from "./user";
import { relations, sql } from "drizzle-orm";

export const notifications = pgTable("notifications", {
  notificationId: serial("notification_id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.userId)
    .notNull(),
  message: text("message").notNull(),
  isRead: boolean("is_read").notNull().default(false),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(users, {
    fields: [notifications.userId],
    references: [users.userId],
  }),
}));
