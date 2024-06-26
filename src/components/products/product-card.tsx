import AddToCart from "@/components/add-to-cart/add-to-cart";
import ProductCardPlaceholder from "@/components/products/product-card-image-placeholder";
import { Card } from "@/components/ui/card";
import { productTable } from "@/db/schema/products";
import Image from "next/image";

type Props = {
  imageSrc?: string;
  product: typeof productTable.$inferSelect;
};

export default function ProductCard({ imageSrc, product }: Props) {
  return (
    <article>
      <Card className="w-full max-w-xs mx-auto rounded-xl border cursor-pointer translate-y-0 hover:translate-y-[-2px] transition-transform">
        <div className="grid gap-4 p-4">
          <div className="aspect-square w-full overflow-hidden rounded-lg">
            {imageSrc ? (
              <Image
                alt="Product Image"
                className="aspect-square object-cover border border-gray-200 dark:border-gray-800"
                height={600}
                src="/placeholder.svg"
                width={600}
              />
            ) : (
              <ProductCardPlaceholder stroke="#fe5858" />
            )}
          </div>
          <div className="text-base font-bold capitalize">{product.name}</div>
          <div className="text-sm">
            {new Intl.NumberFormat("en-PH", {
              style: "currency",
              currency: "PHP",
            }).format(product.price!)}{" "}
            per {product.unit}
          </div>
        </div>
        <div className="p-4 flex items-center justify-center gap-4">
          <AddToCart product={product} />
        </div>
      </Card>
    </article>
  );
}
