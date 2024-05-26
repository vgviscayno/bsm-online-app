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
import Link from "next/link";

type Props = {
  className?: string;
};

export default function MeatCuts({ className }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          buttonVariants({
            variant: "outline",
          }),
          className
        )}
      >
        Meat Cuts
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Link href="/store/search/meat-cuts" prefetch>
            All
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/store/search/pork" prefetch>
            Pork
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/store/search/beef" prefetch>
            Beef
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/store/search/chicken" prefetch>
            Chicken
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
