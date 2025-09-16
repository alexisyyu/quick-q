import {
  pgTable,
  integer,
  serial,
  timestamp,
  text,
  boolean,
  uuid,
  jsonb,
  unique,
} from "drizzle-orm/pg-core";

export const forms = pgTable(
  "forms",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    published: boolean("published").notNull().default(false),
    name: text("name").notNull(),
    description: text("description").notNull(),
    content: text("content").notNull(),

    visits: integer("visits").notNull().default(0),
    responses: integer("responses").notNull().default(0),
    shareURL: uuid("share_url").defaultRandom().notNull(),
  }
  // add unique constraint for userId and name
  // (t) => [unique().on(t.userId, t.name)]
);

export const formResponses = pgTable("form_responses", {
  id: serial("id").primaryKey(),
  formId: integer("form_id")
    .notNull()
    .references(() => forms.id, { onDelete: "cascade" }),
  userId: text("user_id"),
  content: text("content").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
