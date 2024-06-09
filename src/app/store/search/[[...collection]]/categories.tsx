"use client";
import MeatCuts, { getSelectedCategory } from "@/components/meat-cuts-dropdown";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

export default function Categories() {
  const searchParams = useSearchParams();
  const urlSearchParams = new URLSearchParams(searchParams);

  const routeParams = useParams<{ collection?: string[] }>();
  const selectedCategory = getSelectedCategory(routeParams);
  return (
    <div className="flex justify-between space-x-2">
      <Link
        href={`/store/search?${urlSearchParams.toString()}`}
        className={cn(
          buttonVariants({ size: "default", variant: "outline" }),
          "grow",
          { underline: selectedCategory === "all" }
        )}
      >
        <span className="block md:hidden">All</span>
        <span className="hidden md:block">All Products</span>
      </Link>
      <MeatCuts className="grow" />
      <Link
        href={`/store/search/processed-meat?${urlSearchParams.toString()}`}
        className={cn(
          buttonVariants({ size: "default", variant: "outline" }),
          { underline: selectedCategory === "processed-meat" },
          "grow"
        )}
      >
        <span className="block md:hidden">Processed</span>
        <span className="hidden md:block">Processed Meat</span>
      </Link>
    </div>
  );
}
