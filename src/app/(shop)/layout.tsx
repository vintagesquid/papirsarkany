import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";

import AppVersionScript from "~/components/app-version-script";
import CartStoreRehydrate from "~/components/cart-store-rehydrate";
import Footer from "~/components/footer";
import Navbar from "~/components/navbar";
import ToastContainer from "~/components/toast-container";
import TruendoScript from "~/components/truendo-script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    template: "%s | papirsarkany.hu",
    default: 'papirsarkany.hu | Papírsárkány, sárkány, anyagok',
  },
  description: "Papírsárkány árusítás 1984-óta.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="hu"
      className="scroll-pt-[68px] scroll-smooth sm:scroll-pt-[72px]"
    >
      <head>
        <TruendoScript />
        <AppVersionScript />
      </head>
      <body className={`${inter.className} `}>
        <div className="flex min-h-screen flex-col">
          <ToastContainer />
          <Navbar />
          <main className="grid min-h-[calc(100dvh-68px)] flex-1 overflow-x-hidden bg-sky-100 sm:min-h-[calc(100dvh-72px)] lg:min-h-[calc(100dvh-76px)]">
            {children}
            <Analytics />
            <SpeedInsights />
            <CartStoreRehydrate />
          </main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
