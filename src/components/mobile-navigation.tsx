import Link from "next/link";
import type { FC } from "react";

import HamburgerIcon from "~/assets/hamburger.svg";
import type { NavigationItems } from "~/lib/types";
import CartMenuItem from "./cart-menu-item";
import NavigationMenuItem from "./navigation-menu-item";

type MobileNavigationProps = {
  navigationItems: NavigationItems;
};

const MobileNavigation: FC<MobileNavigationProps> = ({ navigationItems }) => {
  return (
    <nav className="d-navbar">
      <div className="d-navbar-start gap-1">
        <div className="d-dropdown">
          {/** biome-ignore lint/a11y/useSemanticElements: we can't use <button> here because Safari has a bug that prevents the button from being focused. */}
          <div
            tabIndex={0}
            role="button"
            className="d-btn d-btn-ghost focus:ring-3 focus:ring-neutral"
            aria-label="mobile navigation menu"
          >
            <HamburgerIcon className="h-5 w-5" />
          </div>

          <ul
            // biome-ignore lint/a11y/noNoninteractiveTabindex: safari has a bug that prevents the button from being focused
            tabIndex={0}
            className="d-menu d-dropdown-content z-1 mt-5 w-52 rounded-box rounded-t-none border-3 border-black border-t-none bg-base-100 p-2 shadow-sm"
            data-pw-e2e="hamburger-menu-content"
          >
            {navigationItems.rightItems.map((navigationItem) => (
              <NavigationMenuItem
                key={navigationItem.href.toString()}
                href={navigationItem.href}
              >
                {navigationItem.children}
              </NavigationMenuItem>
            ))}
            <div className="d-divider m-0" />
            {navigationItems.leftItems.map((navigationItem) => (
              <NavigationMenuItem
                key={navigationItem.href.toString()}
                href={navigationItem.href}
              >
                {navigationItem.children}
              </NavigationMenuItem>
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

export default MobileNavigation;
