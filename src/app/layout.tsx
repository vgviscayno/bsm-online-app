import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProvider from "../context/AuthProvider";
import { cn } from "../lib/utils";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Coming Soon - Bestseller Meatshop",
  description: "The best meatshop next door!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
