import { notFound } from "next/navigation";

export const metadata = {
  title: "A keresett oldal nem található.",
  description: "A keresett oldal nem található."
}

export default function NotFoundCatchAll() {
  notFound();
}
