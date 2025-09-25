"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { type FC, useRef } from "react";
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

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Navigation: FC = () => {
  const navigationBarRef = useRef<HTMLDivElement>(null);

  const isDesktop = useMedia({ minWidth: breakPoint }, true);

  useGSAP(() => {
    gsap.to(navigationBarRef.current, {
      scrollTrigger: {
        trigger: document.body,
        start: `+=${navigationBarRef.current?.offsetHeight}`,
        end: "+=150",
        scrub: 0.35,
      },
      y: "30px",
      width: "95%",
      borderRadius: "1rem",
    });

    gsap.to(navigationBarRef.current, {
      scrollTrigger: {
        trigger: document.body,
        start: `+=${navigationBarRef.current?.offsetHeight ?? 0 + 25}`,
        end: "+=25",
        scrub: true,
      },
      borderTopWidth: "4px",
      borderLeftWidth: "4px",
      borderRightWidth: "4px",
      borderBottomWidth: "10px",
    });
  });
  return (
    <div
      ref={navigationBarRef}
      className="sticky top-0 z-40 mx-auto w-full border-black border-b-4 bg-white"
    >
      {isDesktop ? (
        <DesktopNavigation navigationItems={navigationItems} />
      ) : (
        <MobileNavigation navigationItems={navigationItems} />
      )}
    </div>
  );
};

export default Navigation;
