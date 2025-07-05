import Link from "next/link";
import type { FC } from "react";

import HomeIcon from "~/assets/home.svg";
import type { NavbarItems } from "~/lib/types";
import CartMenuItem from "./cart-menu-item";
import NavMenuItem from "./nav-menu-item";

type DesktopNavbarProps = {
  navbarItems: NavbarItems;
};

const DesktopNavbar: FC<DesktopNavbarProps> = ({ navbarItems }) => {
  return (
    <nav className="d-navbar min-h-[68px] border-black border-b-4 bg-white">
      <div className="d-navbar-start hidden gap-1 md:flex">
        <Link
          href={"/#hello"}
          className="d-btn d-btn-ghost py-1 text-xl normal-case hover:bg-sky-200!"
          aria-label="home"
        >
          <HomeIcon className="h-full" />
        </Link>
        <ul className="d-menu d-menu-horizontal flex-nowrap gap-2 font-extrabold text-base">
          {navbarItems.leftItems.map((navbarItem) => (
            <NavMenuItem
              key={navbarItem.href.toString()}
              href={navbarItem.href}
            >
              {navbarItem.children}
            </NavMenuItem>
          ))}
        </ul>
      </div>
      <div className="d-navbar-end hidden md:flex">
        <ul className="d-menu d-menu-horizontal gap-2 font-extrabold text-base">
          {navbarItems.rightItems.map((navbarItem) => (
            <NavMenuItem
              key={navbarItem.href.toString()}
              href={navbarItem.href}
            >
              {navbarItem.children}
            </NavMenuItem>
          ))}
        </ul>
        <div className="flex-none">
          <CartMenuItem />
        </div>
      </div>
    </nav>
  );
};

export default DesktopNavbar;
