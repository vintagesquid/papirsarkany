import type { Metadata } from "next";
import Link from "next/link";
import Heading from "~/components/heading";
import "./(shop)/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "A keresett oldal nem található.",
  description: "A keresett oldal nem található.",
};

export default function NotFound() {
  return (
    <html
      lang="hu"
      className="scroll-pt-[68px] scroll-smooth sm:scroll-pt-[72px]"
    >
      <body className={inter.className}>
        <div className="splash-pattern grid min-h-screen place-items-center bg-cover bg-sky-100 text-white">
          <div className="text-center">
            <Heading as="h1" size={2}>
              A keresett oldal nem található.
            </Heading>
            <Link
              className="d-btn d-btn-ghost d-btn-primary d-btn-lg normal-case"
              href="/sarkanyok"
            >
              Nézz szét a sárkányaink közt
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
