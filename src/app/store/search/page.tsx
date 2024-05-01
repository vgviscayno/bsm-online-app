import ProductCard from "@/components/product-card";
import ProductList from "@/components/product-list";
import { db } from "@/db";
import { collectionTable, productTable } from "@/db/schema/products";
import { eq } from "drizzle-orm/sql";
import { type Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Search - Bestseller Meatshop",
  description: "The best meatshop next door!",
};

async function getData() {
  "use server";
  const rows = db
    .select()
    .from(productTable)
    .leftJoin(collectionTable, eq(productTable.id, collectionTable.id));
  return rows;
}

export default async function SearchPage() {
  const rows = await getData();

  return (
    <section className="flex flex-col h-svh">
      {/* Products List */}
      <ProductList products={rows.map((row) => row.product)} />
    </section>
  );
}
