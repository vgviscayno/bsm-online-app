import Link from "next/link";
import { SVGProps } from "react";

export default function Footer() {
  return (
    <footer className="w-full border-t">
      <div className="container py-12 grid-in-1 md:grid-cols-2 lg:py-16 xl:grid-cols-4 xl:gap-8">
        <div className="grid gap-4 xl:col-start-2 xl:gap-2 xl:order-2">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">About Us</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Your destination for finding fresh and high quality meat. From
              meat cuts to processed meat, we help you satisfy your cravings.
            </p>
          </div>
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Contact Us</h2>
            <address className="not-italic">
              <p className="text-sm">Brgy. Iponan</p>
              <p className="text-sm">Cagayan de Oro, Misamis Oriental, 9000</p>
            </address>
            <p className="text-sm">+639177776254</p>
            <p className="text-sm">support@bestsellermeatshop.com</p>
          </div>
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Shipping Information</h2>
            <p className="text-sm">
              We offer free shipping on all orders over PHP300. For orders under
              PHP300, standard shipping costs PHP10/km.
            </p>
            <p className="text-sm">
              Your order will be delivered within store hours. We also entertain
              scheduled deliveries.
            </p>
            <p className="text-sm">
              For more information, please review our{" "}
              <Link className="underline" href="#">
                shipping policy
              </Link>
              .
            </p>
          </div>
        </div>
        <div className="grid gap-2 xl:col-start-4 xl:order-3">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Social Media</h2>
            <div className="flex items-center gap-2">
              {/* <TwitterIcon className="w-4 h-4" /> */}
              <a
                href="https://www.facebook.com/m.bestseller"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              {/* <InstagramIcon className="w-4 h-4" />
              <YoutubeIcon className="w-4 h-4" /> */}
            </div>
          </div>
        </div>
        <nav className="flex flex-col items-start gap-1 text-sm xl:gap-2 xl:col-start-3 xl:order-4">
          <div className="grid-in-1">
            <Link className="underline" href="#">
              About Us
            </Link>
            <Link className="underline" href="#">
              Contact Us
            </Link>
            <Link className="underline" href="#">
              Shipping Information
            </Link>
          </div>
        </nav>
        <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-xs tracking-wide text-gray-500">
            © 2023 Bestseller Meatshop. All rights reserved.
          </p>
          {/* <div className="flex gap-4 text-sm">
            <Link className="underline" href="#">
              Terms & Conditions
            </Link>
            <Link className="underline" href="#">
              Privacy Policy
            </Link>
          </div> */}
        </div>
      </div>
    </footer>
  );
}

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TwitterIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function YoutubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}
