import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center h-dvh">
      <Image
        priority
        src="/bsm-logo-square.png"
        alt="Bestseller Meatshop Logo"
        width={284}
        height={284}
      />
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Page not found
      </h1>
      <Link href="/store" className={buttonVariants({ variant: "link" })}>
        Go back to home page
      </Link>
    </section>
  );
}
