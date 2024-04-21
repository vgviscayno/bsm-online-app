import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default async function DashboardPage() {
  return (
    <section className="grow flex flex-col items-center justify-start space-y-4 mt-2">
      <Image
        priority
        src="/bsm-logo-square.png"
        alt="Bestseller Meatshop Logo"
        width={284}
        height={284}
      />
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
        Welcome to Bestseller Meatshop online!
      </h1>
      <p className="text-xl text-muted-foreground">
        What do you want to order?
      </p>

      <div className="flex flex-col justify-center items-center space-y-2">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Browse by selection
        </h2>
        <div className="flex space-x-4">
          <Button variant="link" size="lg" asChild>
            <Link href="#">All Products</Link>
          </Button>
          <Button variant="link" size="lg" asChild>
            <Link href="#">Meat Cuts</Link>
          </Button>
          <Button variant="link" size="lg" asChild>
            <Link href="#">Processed Meat</Link>
          </Button>
        </div>
      </div>

      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        or
      </h2>

      <SearchBar />
    </section>
  );
}
