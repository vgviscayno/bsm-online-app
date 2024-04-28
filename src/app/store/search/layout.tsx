import Footer from "@/components/footer";
import MainNavigation from "@/components/main-navigation";
import SearchBar from "@/components/search";
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
  return (
    <main className="h-dvh flex flex-col">
      <header className="flex flex-col">
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
        <div className="p-4 border-b">
          <SearchBar />
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
