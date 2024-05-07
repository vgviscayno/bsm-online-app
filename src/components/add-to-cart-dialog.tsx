"use client";
import ProductCardPlaceholder from "@/components/product-card-image-placeholder";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { productTable } from "@/db/schema/products";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = { product: typeof productTable.$inferSelect };

export default function AddToCartDialog({ product }: Props) {
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
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            Add to Cart
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              Add <span className="capitalize">{product.name}</span> to Cart
            </DialogTitle>
            <DialogDescription>
              Add additional info here. Click Add to Cart when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          {/* Form here */}
          <FillItemDetailsForm unit={product.unit} price={product.price} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-full">
          Add to Cart
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DialogTitle>
            Add <span className="capitalize">{product.name}</span> to Cart
          </DialogTitle>
          <DialogDescription>
            Add additional info here. Click Add to Cart when you&apos;re done.
          </DialogDescription>
        </DrawerHeader>
        {/* Form here */}
        <FillItemDetailsForm unit={product.unit} price={product.price} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

const formSchema = z.object({
  quantity: z.number().min(0.25).max(10),
  notes: z.string(),
});

function FillItemDetailsForm({ unit, price }: { unit: string; price: number }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantity: 1,
      notes: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({ values });
  }

  return (
    <React.Fragment>
      <ProductCardPlaceholder />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col px-4 space-y-2"
        >
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity ({unit})</FormLabel>
                <FormControl>
                  <Input {...field} type="number" min={0.25} step={0.25} />
                </FormControl>
                <FormDescription>
                  Price:{" "}
                  {new Intl.NumberFormat("en-PH", {
                    style: "currency",
                    currency: "PHP",
                  }).format(price)}{" "}
                  per {unit} <br />
                  Total amount for this item:{" "}
                  {new Intl.NumberFormat("en-PH", {
                    style: "currency",
                    currency: "PHP",
                  }).format(field.value * price)}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Do not chop, frozen, etc." />
                </FormControl>
                <FormDescription>
                  You can add here special instructions for this item
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Add to Cart</Button>
        </form>
      </Form>
    </React.Fragment>
  );
}
