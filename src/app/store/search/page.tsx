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
    <section className="flex flex-col h-svh">
      {/* Products List */}
      <div className="mt-4 flex flex-col space-y-4 overflow-auto py-2">
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </section>
  );
}
