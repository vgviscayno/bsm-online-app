import { pgEnum, pgTable, real, text } from "drizzle-orm/pg-core";

export const unitEnum = pgEnum("unit", ["piece", "gram", "pack"]);

export const productTable = pgTable("product", {
  id: text("id").primaryKey(),
  name: text("name").unique().notNull(),
  unit: unitEnum("unit"),
  price: real("price"),
  collectionId: text("collection_id")
    .notNull()
    .references(() => collectionTable.id),
});

export const collectionTable = pgTable("collection", {
  id: text("id").primaryKey(),
  name: text("name").unique().notNull(),
});
