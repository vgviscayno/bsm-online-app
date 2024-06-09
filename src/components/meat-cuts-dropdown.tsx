"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

type Props = {
  className?: string;
};

export function getSelectedCategory(params: { collection?: string[] }): string {
  return typeof params.collection === "undefined"
    ? "all"
    : params.collection[0];
}

// price tag - cover.m2ts
const MEATCUTS_LABEL = {
  pork: "Meat Cuts - Pork",
  chicken: "Meat Cuts - Chicken",
  beef: "Meat Cuts - Beef",
  "meat-cuts": "Meat Cuts",
};

export default function MeatCuts({ className }: Props) {
  const searchParams = useSearchParams();
  const urlSearchParams = new URLSearchParams(searchParams);

  const routeParams = useParams<{ collection?: string[] }>();
  const selectedCategory = getSelectedCategory(routeParams);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          buttonVariants({
            variant: "outline",
          }),
          {
            underline:
              selectedCategory === "pork" ||
              selectedCategory === "chicken" ||
              selectedCategory === "meat-cuts" ||
              selectedCategory === "beef",
          },
          className
        )}
      >
        {selectedCategory === "pork" ||
        selectedCategory === "chicken" ||
        selectedCategory === "meat-cuts" ||
        selectedCategory === "beef"
          ? MEATCUTS_LABEL[selectedCategory]
          : MEATCUTS_LABEL["meat-cuts"]}

        <ChevronDownIcon className="h-4 w-4 ml-2" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Link
            href={`/store/search/meat-cuts?${urlSearchParams.toString()}`}
            prefetch
          >
            All
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link
            href={`/store/search/pork?${urlSearchParams.toString()}`}
            prefetch
          >
            Pork
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href={`/store/search/beef?${urlSearchParams.toString()}`}
            prefetch
          >
            Beef
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href={`/store/search/chicken?${urlSearchParams.toString()}`}
            prefetch
          >
            Chicken
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
