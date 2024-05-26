"use client";
import AddToCartDialog from "@/components/add-to-cart/dialog";
import AddToCartDrawer from "@/components/add-to-cart/drawer";
import { productTable } from "@/db/schema/products";
import { useEffect, useState } from "react";

export type Props = { product: typeof productTable.$inferSelect };

export default function AddToCart({ product }: Props) {
  // form
  // quantity (plus, minus)
  // notes (for special requests)
  const [open, setOpen] = useState(false);
  const isDesktop =
    typeof window !== "undefined" ? window?.innerWidth > 768 : true;

  useEffect(() => {
    function handleResize() {
      // if window is resized, just close both dialog and drawer (?)
      setOpen(false);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      removeEventListener("resize", handleResize);
    };
  }, []);

  if (isDesktop) {
    return <AddToCartDialog product={product} open={open} setOpen={setOpen} />;
  }

  return <AddToCartDrawer product={product} open={open} setOpen={setOpen} />;
}
