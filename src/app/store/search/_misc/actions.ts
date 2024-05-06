"use server";
import { db } from "@/db";
import { collectionTable, productTable } from "@/db/schema/products";
import { and, eq, ilike } from "drizzle-orm";

export async function getData({
  collection,
  searchTerm,
}: {
  collection?: string[];
  searchTerm?: string | null;
}) {
  let rows = db
    .select()
    .from(productTable)
    .leftJoin(
      collectionTable,
      eq(productTable.collectionId, collectionTable.id)
    );

  if (Array.isArray(collection) && typeof searchTerm !== "string") {
    rows.where(eq(collectionTable.slug, collection[0]));
  }

  if (!Array.isArray(collection) && typeof searchTerm === "string") {
    rows.where(ilike(productTable.name, `%${searchTerm}%`));
  }

  if (Array.isArray(collection) && typeof searchTerm === "string") {
    rows.where(
      and(
        ilike(productTable.name, `%${searchTerm}%`),
        eq(collectionTable.slug, collection[0])
      )
    );
  }

  return await rows;
}
