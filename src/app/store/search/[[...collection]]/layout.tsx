import Categories from "@/app/store/search/[[...collection]]/categories";
import Cart from "@/components/cart/cart";
import SearchBar from "@/components/search";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bestseller Meatshop",
  description: "The best meatshop next door!",
};

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    collection: string[];
  };
}) {
  console.log({ params });
  return (
    <section>
      <div className="hidden md:block">
        <DesktopNavigation />
      </div>
      <div className="block md:hidden">
        <MobileNavigation />
      </div>
      {children}
      {/* <Footer /> */}
    </section>
  );
}

function DesktopNavigation() {
  return (
    <header className="flex p-2 space-x-2 items-center">
      <div className="flex space-x-2 items-center">
        <Logo />
        <Categories />
      </div>
      <SearchBar className="w-1/2" />
      <Cart />
    </header>
  );
}

function MobileNavigation() {
  return (
    <header className="flex flex-col p-2">
      <div className="flex py-2 space-x-2 items-center">
        <SearchBar className="w-full" />
        <Cart />
      </div>
      <Categories />
    </header>
  );
}

function Logo() {
  return (
    <Link href="/store" className="flex items-center justify-center w-fit">
      <Image
        priority
        src="/bsm-logo-square.png"
        alt="Bestseller Meatshop Logo"
        width={50}
        height={50}
      />
      <span className="text-md font-semibold hidden xl:block">
        Bestseller
        <br /> Meatshop
      </span>
    </Link>
  );
}
