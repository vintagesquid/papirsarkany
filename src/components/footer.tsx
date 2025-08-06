import Link from "next/link";
import type { FC } from "react";

import FacebookIcon from "~/assets/facebook.svg";

const Footer: FC = () => {
  return (
    <footer className="border-black border-t-4 border-solid bg-sky-50 py-6 text-base-content md:py-10">
      <div className="flex flex-col items-center justify-center gap-x-2 gap-y-4 text-center font-medium text-sm md:flex-row">
        {/* Links */}
        <Link href="/aszf">
          ÁSZF
        </Link>
        <div>|</div>
        <Link href="/impresszum">
          Impresszum
        </Link>

        <div className="d-divider d-divider-neutral d-divider-horizontal hidden md:flex" />

        {/* Copyright */}
        <div className="order-last md:order-none">
          &copy; {new Date().getFullYear()} papirsarkany.hu
        </div>

        <div className="d-divider d-divider-neutral d-divider-horizontal hidden md:flex" />

        {/* Social Media */}
        <Link
          href="https://www.facebook.com/profile.php?id=61554743192842"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook page"
        >
          <FacebookIcon className="h-8 w-8" />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
