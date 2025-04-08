import React from "react";
import Link from "next/link"; // Next.js Link component for client-side routing
import { cn } from "@/lib/utils"; // Utility function for conditional class names
import ROUTES from "@/constants/routes"; // Route constants that contain HOME, PORTFOLIO, and TODO routes

// LeftSidebar component: displays the static navigation sidebar for desktop,
// containing three links: Home, Portfolio, and To-Do.
const LeftSidebar = () => {
  return (
    // Main sidebar container
    // - `custom-scrollbar` applies custom scrollbar styling
    // - `background-light900_dark200` applies light/dark background colors
    // - `light-border` adds a border style
    // - `sticky left-0 top-0 h-screen` keeps the sidebar fixed on the left
    // - `flex flex-col justify-start` lays out children vertically starting at the top
    // - `overflow-y-auto` enables vertical scrolling if content is long
    // - `border-r p-6 pt-36` adds a right border, padding and top padding (pt-36) to push content down below the Navbar if needed
    // - `shadow-light-300 dark:shadow-none` applies a shadow in light mode and none in dark mode
    // - `max-sm:hidden` hides the sidebar on small screens, and `lg:w-[266px]` sets its width on large screens
    <section className="custom-scrollbar background-light900_dark200 light-border sticky left-0 top-0 h-screen flex flex-col justify-start overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]">
      {/* Navigation section */}
      <nav className="flex flex-col gap-6">
        {/* Home Link */}
        <Link
          href={ROUTES.HOME}
          className={cn("text-lg", "hover:primary-text-gradient")}
        >
          Home
        </Link>

        {/* Portfolio Link */}
        <Link
          href={ROUTES.PORTFOLIO}
          className={cn("text-lg", "hover:primary-text-gradient")}
        >
          Portfolio
        </Link>

        {/* To-Do Link */}
        <Link
          href={ROUTES.TODO}
          className={cn("text-lg", "hover:primary-text-gradient")}
        >
          To-Do
        </Link>
      </nav>
    </section>
  );
};

export default LeftSidebar;
