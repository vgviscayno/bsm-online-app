"use server";

import { formSchema } from "@/components/add-to-cart/form";
import { z } from "zod";

export async function addItemToCart(values: z.infer<typeof formSchema>) {
  console.log({ values });
}
