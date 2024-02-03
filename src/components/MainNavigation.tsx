import { cn } from "@/lib/utils";
import Link from "next/link";

export default function MainNavigation({
  className,
}: React.HTMLAttributes<HTMLElement>) {
  // TODO: add logic to determine which page is active
  return (
    <ul className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      <li>
        <Link
          href="#"
          // Classname for active link
          className="text-sm font-medium transition-colors hover:text-primary"
        >
          Products
        </Link>
      </li>
      <li>
        <Link
          href="#"
          // Classname for inactive link
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          My orders
        </Link>
      </li>
    </ul>
  );
}
