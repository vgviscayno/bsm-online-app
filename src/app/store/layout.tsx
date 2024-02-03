import { options } from "@/app/api/auth/[...nextauth]/options";
import MainNavigation from "@/components/MainNavigation";
import UserNavigation from "@/components/UserNavigation";
import { getServerSession } from "next-auth";
import Image from "next/image";

export default async function DashboardLayout({
  children,
  className,
}: React.HTMLAttributes<HTMLElement>) {
  const session = await getServerSession(options);
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
