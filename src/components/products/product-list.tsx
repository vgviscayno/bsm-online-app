import ProductCard from "@/components/products/product-card";
import { productTable } from "@/db/schema/products";

type Props = {
  products: Array<typeof productTable.$inferSelect>;
};

export default function ProductList({ products }: Props) {
  return (
    <div className="mt-4 py-2 grid gap-8 grid-cols-1 md:grid-cols-3 min-h-screen">
      {products.length <= 0 && (
        <p className="mx-auto col-span-3">No products found</p>
      )}
      {products.map((product) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </div>
  );
}
