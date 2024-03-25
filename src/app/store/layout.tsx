import MainNavigation from "@/components/MainNavigation";
import UserNavigation from "@/components/UserNavigation";
import Image from "next/image";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-dvh">
      <nav className="flex h-16 items-center px-4 ">
        {/* Logo */}
        <Image
          priority
          src="/bsm-logo-square.png"
          alt="Bestseller Meatshop Logo"
          width={50}
          height={50}
          className="mr-4"
        />

        {/* Main Navigation */}
        <MainNavigation />

        {/* Search and User Navigation */}
        <div className="ml-auto flex items-center space-x-4">
          <UserNavigation avatarImageSrc={undefined} avatarFallbackText="VV" />
        </div>
      </nav>

      {children}
    </main>
  );
}
