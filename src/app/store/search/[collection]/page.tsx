import Footer from "@/components/footer";
import ProductCard from "@/components/product-card";
import ProductList from "@/components/product-list";
import SearchBar from "@/components/search";
import { db } from "@/db";
import { collectionTable, productTable } from "@/db/schema/products";
import { eq } from "drizzle-orm";
import Image from "next/image";
import { type Metadata } from "next/types";
import React from "react";

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

export default async function SearchByCollectionPage({
  params,
}: {
  params: {
    collection: string;
  };
}) {
  const rows = await getData();

  return (
    <section className="flex flex-col h-svh">
      {/* Products List */}
      <ProductList products={rows.map((row) => row.product)} />
      {/* <div className="mt-4 flex flex-col space-y-4 overflow-auto py-2">
        {products.length <= 0 && <p className="mx-auto">No products found</p>}
        {products.map(({ product }) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div> */}
    </section>
  );
}
