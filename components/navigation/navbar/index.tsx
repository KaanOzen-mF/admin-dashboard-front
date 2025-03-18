import React from "react";
import ThemeSwitcher from "./ThemeSwitcher";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4  bg-green-100">
      <h1>Admin Page</h1>
      <ThemeSwitcher />
    </nav>
  );
};

export default Navbar;
