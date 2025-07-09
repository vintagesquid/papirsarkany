"use client";

import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import type { FC, ReactNode } from "react";

export type NavigationMenuItemProps = LinkProps & {
  children?: ReactNode;
};

const NavigationMenuItem: FC<NavigationMenuItemProps> = (
  props: NavigationMenuItemProps,
) => {
  const { children } = props;

  const pathname = usePathname();

  const isActive = (href: LinkProps["href"]) => {
    if (!pathname || !href) {
      return false;
    }

    if (typeof href === "string") {
      return pathname.includes(href);
    }

    if (href.pathname) {
      return pathname.includes(href.pathname);
    }

    return false;
  };

  return (
    <li className="text-sm lg:text-base">
      <Link
        {...props}
        onClick={() => {
          if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
          }
        }}
        className={
          isActive(props.href)
            ? "underline decoration-2 decoration-primary underline-offset-4"
            : ""
        }
      >
        {children}
      </Link>
    </li>
  );
};

export default NavigationMenuItem;
