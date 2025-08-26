import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "A keresett oldal nem található.",
  description: "A keresett oldal nem található.",
};

export default function NotFoundCatchAll() {
  notFound();
}
