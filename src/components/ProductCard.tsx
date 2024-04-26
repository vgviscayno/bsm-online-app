import ProductCardPlaceholder from "@/components/ProductCardPlaceholder";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { productTable } from "@/db/schema/products";
import Image from "next/image";
import Link from "next/link";

type Props = {
  imageSrc?: string;
  product: typeof productTable.$inferSelect;
};

export default function ProductCard({ imageSrc, product }: Props) {
  return (
    <Link href="#">
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
            <div className="text-base font-bold">{product.name}</div>
            <div className="text-sm">
              {new Intl.NumberFormat("en-PH", {
                style: "currency",
                currency: "PHP",
              }).format(product.price!)}
            </div>
          </div>
          <div className="p-4 flex items-center justify-center gap-4">
            <Button variant="outline" className="w-full">
              Add to cart
            </Button>
          </div>
        </Card>
      </article>
    </Link>
  );
}
