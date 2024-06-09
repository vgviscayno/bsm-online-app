"use server";
import { db } from "@/db";
import { collectionTable, productTable } from "@/db/schema/products";
import { and, eq, ilike, or } from "drizzle-orm";

export async function getData({
  collection,
  searchTerm,
}: {
  collection?: string[];
  searchTerm?: string | null;
}) {
  console.log({ collection, searchTerm });
  let query = db
    .select()
    .from(productTable)
    .leftJoin(
      collectionTable,
      eq(productTable.collectionId, collectionTable.id)
    );

  if (Array.isArray(collection) && typeof searchTerm !== "string") {
    if (collection[0] === "meat-cuts") {
      console.log("fetching meat cuts");
      query.where(
        or(
          or(
            eq(collectionTable.slug, "chicken"),
            eq(collectionTable.slug, "pork")
          ),
          eq(collectionTable.slug, "beef")
        )
      );
    } else {
      console.log("fetching collection:", collection[0]);
      query.where(eq(collectionTable.slug, collection[0]));
    }
  }

  if (!Array.isArray(collection) && typeof searchTerm === "string") {
    console.log("fetching products with the search term:", searchTerm);
    query.where(ilike(productTable.name, `%${searchTerm}%`));
  }

  if (Array.isArray(collection) && typeof searchTerm === "string") {
    console.log(
      "fetching products with the search term:",
      searchTerm,
      "and belongs to collection:",
      collection[0]
    );
    if (collection[0] === "meat-cuts") {
      query.where(
        and(
          ilike(productTable.name, `%${searchTerm}%`),
          or(
            or(
              eq(collectionTable.slug, "chicken"),
              eq(collectionTable.slug, "pork")
            ),
            eq(collectionTable.slug, "beef")
          )
        )
      );
    } else {
      query.where(
        and(
          ilike(productTable.name, `%${searchTerm}%`),
          eq(collectionTable.slug, collection[0])
        )
      );
    }
  }

  const rows = await query;

  return rows;
}
