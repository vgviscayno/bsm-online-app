import Cart from "@/components/cart/cart";
import Footer from "@/components/footer";
import MainNavigation from "@/components/main-navigation";
import MeatCuts from "@/components/meat-cuts-dropdown";
import SearchBar from "@/components/search";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bestseller Meatshop",
  description: "The best meatshop next door!",
};

export default function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    collection: string[];
  };
}) {
  return (
    <main className="h-dvh flex flex-col">
      <header className="flex flex-col">
        <Link href="/store">
          <div className="flex items-center justify-center w-full mt-4">
            <span className="text-lg font-semibold">Bestseller</span>

            <Image
              priority
              src="/bsm-logo-square.png"
              alt="Bestseller Meatshop Logo"
              width={50}
              height={50}
            />

            <span className="text-lg font-semibold">Meatshop</span>
          </div>
        </Link>
        <div className="flex p-2">
          <SearchBar className="flex-grow" />
          <Cart />
        </div>
        <div className="p-2 border-b flex justify-between space-x-2">
          <Link
            href="/store/search"
            className={cn(
              buttonVariants({ size: "default", variant: "outline" }),
              {
                underline: typeof params.collection === "undefined",
              },
              "grow"
            )}
          >
            All Products
          </Link>
          <MeatCuts className="grow" />
          <Link
            href="/store/search/processed-meat"
            className={cn(
              buttonVariants({ size: "default", variant: "outline" }),
              {
                underline: params.collection?.[0] === "processed-meat",
              },
              "grow"
            )}
          >
            Processed Meat
          </Link>
        </div>
      </header>
      {children}

      <Footer />
    </main>
  );
}

function NavigationBar() {
  return (
    <nav className="flex items-center px-4 py-2 justify-between">
      <div className="flex items-center">
        {/* Logo */}
        <div className="mr-4 flex items-center">
          <Image
            priority
            src="/bsm-logo-square.png"
            alt="Bestseller Meatshop Logo"
            width={80}
            height={80}
          />
          <span>BESTSELLER MEATSHOP</span>
        </div>

        {/* Main Navigation */}
        <MainNavigation />
      </div>

      {/* Search */}
      <SearchBar />

      {/* User Navigation */}
      {/* <div className="ml-auto flex items-center space-x-4">
    <UserNavigation avatarImageSrc={undefined} avatarFallbackText="VV" />
  </div> */}
    </nav>
  );
}
