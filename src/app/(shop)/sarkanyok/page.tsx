import type { Metadata } from "next";
import Heading from "~/components/heading";
import KiteCard from "~/components/kite-card";
import ProductContainer from "~/components/product-container";
import { getAllKites } from "~/lib/cms";

export const metadata: Metadata = {
  title: "Sárkányok",
  description:
    "Magyarországon, kézzel készült minőségi papírsárkányok 1984-óta.",
};

export default async function Kites() {
  const kites = await getAllKites();

  return (
    <div className="container p-8">
      <div className="mb-8 text-center font-bold">
        <Heading as={"h1"} className="">
          Sárkányok
        </Heading>
        <Heading as={"h2"} size={3}>
          A vételár tartalmaz 100m eresztőzsinórt és zsinórtartót.
        </Heading>
      </div>

      <ProductContainer>
        {kites.map((kite) => (
          <KiteCard key={kite._id} kite={kite} />
        ))}
      </ProductContainer>
    </div>
  );
}
