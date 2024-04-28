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
          className="text-lg font-semibold transition-colors hover:text-primary"
        >
          All
        </Link>
      </li>
      <li>
        <Link
          href="#"
          // Classname for inactive link
          className="text-lg font-semibold text-muted-foreground transition-colors hover:text-primary"
        >
          Meat cuts
        </Link>
      </li>
      <li>
        <Link
          href="#"
          // Classname for inactive link
          className="text-lg font-semibold text-muted-foreground transition-colors hover:text-primary"
        >
          Processed meat
        </Link>
      </li>
    </ul>
  );
}
