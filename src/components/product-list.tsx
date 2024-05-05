import ProductCard from "@/components/product-card";
import { productTable } from "@/db/schema/products";

type Props = {
  products: Array<typeof productTable.$inferSelect>;
};

export default function ProductList({ products }: Props) {
  return (
    <div className="mt-4 py-2 overflow-auto md:grid md:grid-cols-4 md:gap-8 flex flex-col space-y-8">
      {products.length <= 0 && <p className="mx-auto">No products found</p>}
      {products.map((product) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </div>
  );
}
