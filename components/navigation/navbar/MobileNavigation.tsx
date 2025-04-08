"use client";

import Image from "next/image"; // Next.js optimized image component for better performance
import Link from "next/link"; // Next.js Link component for client-side navigation
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"; // Import Sheet components for creating the mobile modal navigation
import ROUTES from "@/constants/routes"; // Import route constants which include Home, Portfolio, and To-Do

// MobileNavigation component: displays a hamburger menu that opens a sheet (modal) for mobile navigation
// It only shows three links: Home, Portfolio, and To-Do.
const MobileNavigation = () => {
  return (
    <Sheet>
      {/* The trigger element for the modal navigation. The hamburger icon is visible on small screens only. */}
      <SheetTrigger asChild>
        <Image
          src="/icons/hamburger.svg"
          width={36}
          height={36}
          alt="Menu"
          className="invert-colors sm:hidden"
        />
      </SheetTrigger>

      {/* The SheetContent contains the mobile navigation links. It slides in from the left side. */}
      <SheetContent
        side="left"
        className="background-light900_dark200 border-none"
      >
        {/* SheetTitle is hidden but helps with accessibility */}
        <SheetTitle className="hidden">Navigation</SheetTitle>

        {/* Navigation links container */}
        <nav className="flex flex-col space-y-4 p-6">
          {/* Each link is wrapped with SheetClose to automatically close the modal when the link is clicked */}
          <SheetClose asChild>
            <Link href={ROUTES.HOME} className="text-lg">
              Home
            </Link>
          </SheetClose>

          <SheetClose asChild>
            <Link href={ROUTES.PORTFOLIO} className="text-lg">
              Portfolio
            </Link>
          </SheetClose>

          <SheetClose asChild>
            <Link href={ROUTES.TODO} className="text-lg">
              To-Do
            </Link>
          </SheetClose>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
