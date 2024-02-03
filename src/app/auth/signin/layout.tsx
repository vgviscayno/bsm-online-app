import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In - Bestseller Meatshop",
};

export default function SignInPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
