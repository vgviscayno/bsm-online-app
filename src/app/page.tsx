import { ExternalLink, Facebook, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Image
        priority
        src="/bsm-logo-square.png"
        alt="Bestseller Meatshop Logo"
        width={500}
        height={500}
      />
      <h1 className="text-center">Online store under maintenance :)</h1>
      <h2 className="pb-4">For now, you may reach us at:</h2>
      <section className="flex flex-col items-start justify-center space-y-10 p-4">
        <Link
          href="https://www.facebook.com/m.bestseller"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="flex items-center justify-center space-x-2">
            <Facebook color="#1835c9" size={50} />
            <span className="flex items-center">
              <p>m.bestseller</p>
              <ExternalLink color="#000000" size={20} />
            </span>
          </span>
        </Link>

        <Link
          href="tel:+639177776254"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="flex items-center justify-center space-x-2">
            <Phone color="#068e2f" size={50} />
            <p>Main Office</p>
          </span>
        </Link>
      </section>
    </main>
  );
}
