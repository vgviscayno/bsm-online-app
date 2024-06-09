import ProductCardPlaceholder from "@/components/products/product-card-image-placeholder";
import { Button } from "@/components/ui/button";
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
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export type CartItem = {
  id: string;
  product: typeof productTable.$inferSelect;
  quantity: number;
  notes: string;
};

function addCartItem(item: Omit<CartItem, "id">) {
  const cartItems: CartItem[] = JSON.parse(
    localStorage.getItem("cartItems") || "[]"
  );

  const nextCartItems: CartItem[] = [
    ...cartItems,
    {
      id: Math.random().toString(36).substring(7),
      ...item,
    },
  ];

  localStorage.setItem("cartItems", JSON.stringify(nextCartItems));
}

export const formSchema = z.object({
  quantity: z.coerce.number().min(0.25).max(10),
  notes: z.string(),
});

export default function FillItemDetailsForm({
  product,
  afterSubmit,
}: {
  product: typeof productTable.$inferSelect;
  afterSubmit?: () => void;
}) {
  const { unit, price } = product;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantity: 1,
      notes: "",
    },
  });

  const onSubmit = useCallback(
    (values: z.infer<typeof formSchema>) => {
      addCartItem({
        product,
        quantity: values.quantity,
        notes: values.notes,
      });
      if (afterSubmit) {
        afterSubmit();
      }
    },
    [product, afterSubmit]
  );

  return (
    <React.Fragment>
      <ProductCardPlaceholder
        width={170}
        height={170}
        className="ml-auto mr-auto"
      />
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
                  You can add here special instructions for this item!
                  We&apos;ll do our best to <em>meat</em> your needs 😎 <br />{" "}
                  (Pun intended hehe 😄)
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
