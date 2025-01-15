import React from "react";
import Logo from "./Logo";
import NavMenu from "./NavMenu";
import DarkMode from "./DarkMode";
import UserDropdown from "./UserDropdown";
import NavSearch from "./NavSearch";



export default function Navbar() {
  return (
    <div className="flex items-center justify-between py-4 px-4 border-b fixed top-0 w-[100%] z-10 bg-white dark:bg-[hsl(var(--background))]">
      <div className="flex items-center gap-2">
        <Logo />
        <NavMenu />
      </div>
      <div className="flex-1 flex justify-center lg:mr-40">
        <NavSearch />
      </div>
      <div className="flex items-center gap-2">
      
        <DarkMode />
        <UserDropdown />
      </div>
    </div>
  );
}
