import {
  integer,
  pgEnum,
  pgTable,
  real,
  serial,
  text,
} from "drizzle-orm/pg-core";

export const unitEnum = pgEnum("unit", ["piece", "pack", "kilogram"]);

export const productTable = pgTable("product", {
  id: serial("id").primaryKey(),
  name: text("name").unique().notNull(),
  unit: unitEnum("unit"),
  price: real("price"),
  collectionId: integer("collection_id").references(() => collectionTable.id),
});

export const collectionTable = pgTable("collection", {
  id: serial("id").primaryKey(),
  name: text("name").unique().notNull(),
  slug: text("slug").unique().notNull(),
});
