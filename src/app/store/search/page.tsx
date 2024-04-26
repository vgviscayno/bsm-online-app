import ProductCard from "@/components/ProductCard";
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
  const products = db
    .select()
    .from(productTable)
    .leftJoin(collectionTable, eq(productTable.id, collectionTable.id));
  return products;
}

export default async function SearchPage() {
  const products = await getData();

  console.log("asdasd");
  console.log({ products });

  return (
    <section className="flex flex-col h-svh">
      {/* Products List */}
      <div className="mt-4 flex flex-col space-y-4 overflow-auto py-2">
        {products.map(({ product }) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
    </section>
  );
}
