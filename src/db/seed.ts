import { db } from "@/db";
import { productTable } from "@/db/schema/products";

db.insert(productTable)
  .values([
    {
      name: "liempo",
      unit: "kilogram",
      price: 199.75,
      collectionId: "wbqkpm",
    },
    {
      name: "paa",
      unit: "kilogram",
      price: 185.75,
      collectionId: "wbqkpm",
    },
    {
      name: "abaga",
      unit: "kilogram",
      price: 185.75,
      collectionId: "wbqkpm",
    },
    {
      name: "sivako pork longanisa 100g",
      unit: "pack",
      price: 35,
      collectionId: "wbqkpm",
    },
    {
      name: "sivako pork longanisa 500g",
      unit: "pack",
      price: 170,
      collectionId: "jtoo9t",
    },
  ])
  .then(() => {
    console.log("inserted!");
  });
