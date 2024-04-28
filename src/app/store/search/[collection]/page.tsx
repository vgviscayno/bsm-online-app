import Footer from "@/components/footer";
import SearchBar from "@/components/search";
import Image from "next/image";
import { type Metadata } from "next/types";
import React from "react";

export const metadata: Metadata = {
  title: "Search - Bestseller Meatshop",
  description: "The best meatshop next door!",
};

export default function SearchByCollectionPage({
  params,
}: {
  params: {
    collection: string;
  };
}) {
  return (
    <React.Fragment>
      <div className="flex flex-col h-svh">
        <header className="flex items-center justify-center w-full mt-4">
          <span className="text-lg font-semibold">Bestseller</span>

          <Image
            priority
            src="/bsm-logo-square.png"
            alt="Bestseller Meatshop Logo"
            width={50}
            height={50}
          />

          <span className="text-lg font-semibold">Meatshop</span>
          {/* <Link href="/store">

          </Link> */}
        </header>
        <section className="p-4 border-b">
          <SearchBar />
        </section>

        {/* Products List */}
        <div className="mt-4 flex flex-col space-y-4 overflow-auto py-2">
          {/* <ProductCard />
          <ProductCard />
          <ProductCard /> */}
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}
