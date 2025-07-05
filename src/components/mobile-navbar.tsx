import Link from "next/link";
import type { FC } from "react";

import HamburgerIcon from "~/assets/hamburger.svg";
import type { NavbarItems } from "~/lib/types";
import CartMenuItem from "./cart-menu-item";
import NavMenuItem from "./nav-menu-item";

type MobileNavbarProps = {
  navbarItems: NavbarItems;
};

const MobileNavbar: FC<MobileNavbarProps> = ({ navbarItems }) => {
  return (
    <nav className="d-navbar border-black border-b-4 bg-white">
      <div className="d-navbar-start gap-1">
        <div className="d-dropdown">
          <div
            tabIndex={0}
            // biome-ignore lint/a11y/useSemanticElements: we can't use <button> here because Safari has a bug that prevents the button from being focused.
            role="button"
            className="d-btn d-btn-ghost focus:ring-3 focus:ring-neutral"
            aria-label="mobile navigation menu"
          >
            <HamburgerIcon className="h-5 w-5" />
          </div>

          <ul
            // biome-ignore lint/a11y/noNoninteractiveTabindex: safari has a bug that prevents the button from being focused
            tabIndex={0}
            className="d-menu d-dropdown-content z-1 mt-5 w-52 rounded-box bg-base-100 p-2 shadow-sm"
            data-pw-e2e="hamburger-menu-content"
          >
            {navbarItems.rightItems.map((navbarItem) => (
              <NavMenuItem
                key={navbarItem.href.toString()}
                href={navbarItem.href}
              >
                {navbarItem.children}
              </NavMenuItem>
            ))}
            <div className="d-divider m-0" />
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

        <div className="flex-none">
          <CartMenuItem />
        </div>
      </div>

      <div className="d-navbar-end">
        <Link
          href={"/"}
          className="d-btn d-btn-ghost normal-case min-[320px]:text-xl"
        >
          papirsarkany.hu
        </Link>
      </div>
    </nav>
  );
};

export default MobileNavbar;
