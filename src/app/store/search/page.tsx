import { getData } from "@/app/store/search/_misc/actions";
import ProductList from "@/components/product-list";
import { type Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Search - Bestseller Meatshop",
  description: "The best meatshop next door!",
};

export default async function SearchPage({
  params,
  searchParams,
}: {
  params: {
    collection: string;
  };
  searchParams?: { [key: string]: string | undefined };
}) {
  const rows = await getData({
    collection: params.collection,
    searchTerm: searchParams?.search,
  });

  return (
    <section className="flex flex-col h-svh">
      {/* Products List */}
      <ProductList products={rows.map((row) => row.product)} />
    </section>
  );
}
