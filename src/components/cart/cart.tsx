"use client";
import CartDialog from "@/components/cart/cart-dialog";
import { useEffect, useState } from "react";

export type Props = {};

export default function Cart({}: Props) {
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

  return <CartDialog open={open} setOpen={setOpen} />;

  // if (isDesktop) {
  //   return <AddToCartDialog product={product} open={open} setOpen={setOpen} />;
  // }

  // return <AddToCartDrawer product={product} open={open} setOpen={setOpen} />;
}
