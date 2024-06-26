import { pgEnum, pgTable, real, text } from "drizzle-orm/pg-core";
import { generateId } from "lucia";

export const unitEnum = pgEnum("unit", ["piece", "pack", "kilogram"]);

export const productTable = pgTable("product", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateId(6)),
  name: text("name").unique().notNull(),
  unit: unitEnum("unit").notNull(),
  price: real("price").notNull().default(1),
  collectionId: text("collection_id").references(() => collectionTable.id),
});

export const collectionTable = pgTable("collection", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateId(6)),
  name: text("name").unique().notNull(),
  slug: text("slug").unique().notNull(),
});
