import { getData } from "@/app/store/search/_misc/actions";
import ProductList from "@/components/product-list";
import { type Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Search - Bestseller Meatshop",
  description: "The best meatshop next door!",
};

export default async function SearchByCollectionPage({
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
      {/* <div className="mt-4 flex flex-col space-y-4 overflow-auto py-2">
        {products.length <= 0 && <p className="mx-auto">No products found</p>}
        {products.map(({ product }) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div> */}
    </section>
  );
}
