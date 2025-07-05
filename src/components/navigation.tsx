"use client";

import type { FC } from "react";
import useMedia from "use-media";

import type { NavigationItems } from "~/lib/types";
import DesktopNavigation from "./desktop-navigation";
import MobileNavigation from "./mobile-navigation";

let breakPoint: string;

if (typeof window !== "undefined") {
  const styles = getComputedStyle(document.documentElement);
  breakPoint = styles.getPropertyValue("--breakpoint-md");
}

const navigationItems: NavigationItems = {
  leftItems: [
    {
      children: "A vállalkozásról",
      href: "/#vallalkozas",
    },
    {
      children: "Sárkány készítés",
      href: "/#sarkany-keszites",
    },
    {
      children: "Elérhetőség",
      href: "/#elerhetoseg",
    },
  ],
  rightItems: [
    {
      children: "Sárkányok",
      href: "/sarkanyok",
    },
    {
      children: "Anyagok",
      href: "/anyagok",
    },
  ],
};

const Navigation: FC = () => {
  const isDesktop = useMedia({ minWidth: breakPoint }, true);

  return (
    <div className="sticky top-0 z-40">
      {isDesktop ? (
        <DesktopNavigation navigationItems={navigationItems} />
      ) : (
        <MobileNavigation navigationItems={navigationItems} />
      )}
    </div>
  );
};

export default Navigation;
