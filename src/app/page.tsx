import { ExternalLink, Facebook, Mail, Phone } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex h-dvh flex-col items-center justify-center p-24">
      <Image
        priority
        src="/bsm-logo-square.png"
        alt="Bestseller Meatshop Logo"
        width={300}
        height={300}
      />
      <h1 className="text-center">Online store under maintenance :)</h1>
      <h2 className="pb-4">For now, you may reach us at:</h2>
      <section className="flex flex-col items-center justify-center space-y-10 p-4">
        <a
          href="https://www.facebook.com/m.bestseller"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="flex flex-col items-center justify-center space-x-2">
            <Facebook color="#1835c9" size={50} />
            <span className="flex items-center">
              <p>m.bestseller</p>
              <ExternalLink color="#000000" size={20} />
            </span>
          </span>
        </a>

        <a href="tel:+639177776254" target="_blank" rel="noopener noreferrer">
          <span className="flex flex-col items-center justify-center space-x-2">
            <Phone color="#068e2f" size={50} />
            <p>Main Office</p>
          </span>
        </a>

        <a href="mailto:support@bestsellermeatshop.com" target="_blank">
          <span className="flex flex-col items-center justify-center space-x-2">
            <Mail size={50} />
            <p>support@bestsellermeatshop.com</p>
          </span>
        </a>
      </section>
      <section>
        <p>
          You can message us anytime, but for a swift response, kindly contact
          us during office hours:
        </p>
        <ul className="w-fit ml-auto mr-auto text-left">
          <li>7:00 AM - 12:00 PM</li>
          <li>2:00 PM - 5:00 PM</li>
        </ul>
      </section>
    </main>
  );
}
