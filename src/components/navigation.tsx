"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
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

const ANIMATION_OFFSET = 30;

const Navigation: FC = () => {
  const navigationBarRef = useRef<HTMLDivElement>(null);

  const isDesktop = useMedia({ minWidth: breakPoint }, true);

  useGSAP(() => {
    const toggleDraggable = (progress: number) => {
      if (progress > 0) {
        draggable.enable();
      } else if (progress === 0) {
        draggable.disable();
      }
    };

    const draggable = Draggable.create(navigationBarRef.current, {
      type: "x,y",
      inertia: true,
      bounds: navigationBarRef.current,
      edgeResistance: 0.85,
      dragClickables: false,
      onDragEnd: function () {
        gsap.to(this.target, {
          x: 0,
          y: this.startY,
          duration: 0.65,
          ease: "elastic.out(0.6, 0.4)",
        });
      },
    })[0];

    gsap.to(navigationBarRef.current, {
      scrollTrigger: {
        trigger: document.body,
        start: `+=${navigationBarRef.current?.offsetHeight}`,
        end: "+=150",
        scrub: 0.35,
        onRefreshInit({ progress }) {
          toggleDraggable(progress);
        },
        onUpdate({ progress }) {
          toggleDraggable(progress);
        },
      },
      y: ANIMATION_OFFSET,
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
