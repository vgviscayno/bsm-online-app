"use client";
import AddToCartDialog from "@/components/add-to-cart/dialog";
import AddToCartDrawer from "@/components/add-to-cart/drawer";
import { CartItem } from "@/components/add-to-cart/form";
import { isProductInCart } from "@/components/cart/utils";
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

  const cartItems: CartItem[] =
    typeof window !== "undefined"
      ? JSON.parse(localStorage?.getItem("cartItems") || "[]")
      : [];

  const triggerName = isProductInCart(cartItems, product.id)
    ? "Modify Order"
    : "Add to Cart";

  if (isDesktop) {
    return (
      <AddToCartDialog
        label={triggerName}
        product={product}
        open={open}
        setOpen={setOpen}
      />
    );
  }

  return (
    <AddToCartDrawer
      label={triggerName}
      product={product}
      open={open}
      setOpen={setOpen}
    />
  );
}
