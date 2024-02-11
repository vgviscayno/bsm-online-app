"use client";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <main>
      <p>Oops! Something went wrong :(</p>
      <Link className={buttonVariants({ variant: "outline" })} href=".">
        Try again
      </Link>
    </main>
  );
}
