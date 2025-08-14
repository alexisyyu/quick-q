import {
  pgTable,
  integer,
  serial,
  timestamp,
  text,
  boolean,
  jsonb,
} from "drizzle-orm/pg-core";
import { uuid } from "zod";

export const forms = pgTable("forms", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  published: boolean("published").default(false),
  name: text("name").notNull(),
  description: text("description").notNull(),
  content: jsonb("content").notNull(),

  visits: integer("visits").default(0),
  responses: integer("responses").default(0),
  shareURL: text("share_url").notNull().default(uuid().toString()),
});

export const formResponses = pgTable("form_responses", {
  id: serial("id").primaryKey(),
  formId: integer("form_id")
    .notNull()
    .references(() => forms.id, { onDelete: "cascade" }),
  userId: text("user_id").notNull(),
  content: jsonb("content").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
