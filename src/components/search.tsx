"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchBar({ className }: { className?: string }) {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const router = useRouter();
  const pathname = usePathname();
  async function searchProduct() {
    console.log({ searchTerm });
    const params = new URLSearchParams(searchParams);
    if (searchTerm) {
      params.set("search", searchTerm);
    } else {
      params.delete("search");
    }

    console.log();
    if (pathname.split("/").length !== 3) {
      router.replace(`${pathname}/search?${params.toString()}`);
    } else {
      router.replace(`${pathname}?${params.toString()}`);
    }
  }

  return (
    <div className={cn(className, "flex min-w-3/12 space-x-2")}>
      <Input
        placeholder="Search for products..."
        type="search"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.currentTarget.value);
        }}
      />
      <Button size="icon" onClick={searchProduct}>
        <Search />
      </Button>
    </div>
  );
}
