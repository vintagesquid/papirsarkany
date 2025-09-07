import Link from "next/link";
import Heading from "~/components/heading";

export default function NotFound() {
  return (
    <div className="grid place-items-center">
      <div className="text-center">
        <Heading as="h1" size={2}>
          A keresett oldal nem található.
        </Heading>
        <Link
          className="d-btn d-btn-ghost d-btn-lg normal-case"
          href="/sarkanyok"
        >
          Nézz szét a sárkányaink közt
        </Link>
      </div>
    </div>
  );
}
