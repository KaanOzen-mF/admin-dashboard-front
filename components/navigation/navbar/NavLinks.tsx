"use client"; // This component runs on the client side

// Import SheetClose to close the mobile sheet when a navigation link is clicked
import { SheetClose } from "@/components/ui/sheet";
// Import sidebarLinks: an array of objects representing navigation items
import { sidebarLinks } from "@/constants";
// Import the utility function for conditionally joining class names
import { cn } from "@/lib/utils";
//import Image from "next/image"; // Next.js optimized image component
import Link from "next/link"; // Next.js link component for client-side navigation
import { usePathname } from "next/navigation"; // Hook to get the current URL path
import React from "react";

// NavLinks component renders navigation links based on sidebarLinks data.
// It accepts an optional prop isMobileNav to adjust rendering for mobile navigation.
const NavLinks = ({ isMobileNav = false }: { isMobileNav?: boolean }) => {
  // Get the current path from the Next.js router
  const pathname = usePathname();
  // For demonstration purposes, a static userId is defined.
  // In a real-world app, this would be derived from the authenticated user's data.

  return (
    <>
      {sidebarLinks.map((item) => {
        // Determine if the current navigation item should be marked as active.
        // An item is active if the current pathname includes its route (with additional logic for root paths)
        const isActive =
          (pathname.includes(item.route) && item.route.length > 1) ||
          pathname === item.route;

        // Create the LinkComponent for this navigation item.
        const LinkComponent = (
          <Link
            href={item.route}
            key={item.label}
            className={cn(
              // Apply different styling when the link is active
              isActive
                ? "primary-gradient rounded-lg text-light-900"
                : "text-dark300_light900",
              // Base styling for the link: flex layout, padding, etc.
              "flex items-center justify-start gap-4 bg-transparent p-4"
            )}
          >
            {/* Render the navigation icon/image 
            <Image
              src={item.imgURL}
              alt={item.label}
              width={20}
              height={20}
              className={cn({ "invert-colors": !isActive })}
            />*/}
            {/* Render the navigation label */}
            <p
              className={cn(
                // Bold text when active, medium otherwise
                isActive ? "base-bold" : "base-medium",
                // Hide label on desktop if it's mobile navigation
                !isMobileNav && "max-lg:hidden"
              )}
            >
              {item.label}
            </p>
          </Link>
        );

        // If isMobileNav is true, wrap the LinkComponent with SheetClose so that clicking the link closes the mobile sheet.
        return isMobileNav ? (
          <SheetClose asChild key={item.route}>
            {LinkComponent}
          </SheetClose>
        ) : (
          // Otherwise, simply return the LinkComponent within a React fragment.
          <React.Fragment key={item.route}>{LinkComponent}</React.Fragment>
        );
      })}
    </>
  );
};

export default NavLinks;
