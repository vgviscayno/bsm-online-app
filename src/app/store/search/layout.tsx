import MainNavigation from "@/components/MainNavigation";
import SearchBar from "@/components/SearchBar";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Bestseller Meatshop",
  description: "The best meatshop next door!",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="h-dvh flex flex-col">{children}</main>;
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
