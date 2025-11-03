import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import Link from "next/link";
import { type FC, useEffect, useRef, useState } from "react";
import HamburgerIcon from "~/assets/hamburger.svg";
import type { NavigationItems } from "~/lib/types";
import CartMenuItem from "./cart-menu-item";
import NavigationMenuItem from "./navigation-menu-item";

type MobileNavigationProps = {
  navigationItems: NavigationItems;
};

const MobileNavigation: FC<MobileNavigationProps> = ({ navigationItems }) => {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);

  const gsapTimelineRef = useRef(gsap.timeline({ paused: true }));
  const navigationListRef = useRef<HTMLUListElement>(null);

  useGSAP(() => {
    gsapTimelineRef.current
      .from(navigationListRef.current, {
        height: 0,
        paddingBottom: 0,
        duration: 0.35,
        ease: CustomEase.create(
          "ease-in-back",
          "M0,0 C0,0 0.157,0.008 0.204,0.006 0.221,0.005 0.241,0.008 0.255,0.013 0.268,0.019 0.294,0.036 0.307,0.048 0.322,0.062 0.349,0.099 0.362,0.122 0.377,0.149 0.401,0.201 0.417,0.248 0.458,0.366 0.526,0.632 0.565,0.754 0.579,0.799 0.597,0.848 0.61,0.876 0.621,0.902 0.646,0.949 0.66,0.968 0.673,0.987 0.702,1.017 0.717,1.027 0.732,1.037 0.759,1.048 0.78,1.049 0.83,1.052 1,1 1,1 ",
        ),
      })
      .to(navigationListRef.current, { height: "auto", duration: 0 });
  });

  useEffect(() => {
    if (isNavigationOpen) {
      gsapTimelineRef.current.play();
    } else {
      gsapTimelineRef.current.reverse();
    }
  }, [isNavigationOpen]);

  const toggleNavigationList = () => {
    setIsNavigationOpen((state) => !state);
  };

  const closeNavigationList = () => {
    setIsNavigationOpen(false);
  };

  return (
    <nav>
      <div className="d-navbar">
        <div className="d-navbar-start gap-1">
          <div className="d-dropdown">
            <button
              type="button"
              onClick={toggleNavigationList}
              className="d-btn d-btn-ghost focus:ring-3 focus:ring-neutral"
              aria-label="mobile navigation menu"
            >
              <HamburgerIcon className="h-5 w-5" />
            </button>
          </div>
          <div className="flex-none">
            <CartMenuItem onNavigate={closeNavigationList} />
          </div>
        </div>
        <div className="d-navbar-end">
          <Link
            href={"/"}
            className="d-btn d-btn-ghost normal-case min-[320px]:text-xl"
            onNavigate={closeNavigationList}
          >
            papirsarkany.hu
          </Link>
        </div>
      </div>

      <ul
        ref={navigationListRef}
        className="space-y-4 overflow-y-hidden pb-2 font-bold *:p-2 *:pl-4"
        data-pw-e2e="hamburger-menu-content"
      >
        {navigationItems.rightItems.map((navigationItem) => (
          <NavigationMenuItem
            key={navigationItem.href.toString()}
            href={navigationItem.href}
            onNavigate={closeNavigationList}
          >
            {navigationItem.children}
          </NavigationMenuItem>
        ))}
        <li className='d-divider m-0' />
        {navigationItems.leftItems.map((navigationItem) => (
          <NavigationMenuItem
            key={navigationItem.href.toString()}
            href={navigationItem.href}
            onNavigate={closeNavigationList}
          >
            {navigationItem.children}
          </NavigationMenuItem>
        ))}
      </ul>
    </nav>
  );
};

export default MobileNavigation;
