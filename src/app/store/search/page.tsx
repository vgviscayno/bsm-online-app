import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import { type Metadata } from "next/types";
import Image from "next/image";
import Footer from "@/components/Footer";
import React from "react";

export const metadata: Metadata = {
  title: "Search - Bestseller Meatshop",
  description: "The best meatshop next door!",
};

export default function SearchPage() {
  return (
    <React.Fragment>
      <section className="flex flex-col h-svh">
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
        </header>
        <div className="p-4">
          <SearchBar />
        </div>

        {/* Products List */}
        <div className="mt-4 flex flex-col space-y-4 overflow-auto py-2">
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </section>
      <Footer />
    </React.Fragment>
  );
}
