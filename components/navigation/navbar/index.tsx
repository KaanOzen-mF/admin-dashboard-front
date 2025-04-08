import React from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4  bg-green-100">
      <h1>
        <Link href="/">Admin Page</Link>
      </h1>
      <ThemeSwitcher />
    </nav>
  );
};

export default Navbar;
