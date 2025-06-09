import ProductContainer from "~/components/product-container";
import ReelCard from "~/components/reel-card";
import RodCard from "~/components/rod-card";
import TwineCard from "~/components/twine-card";

import { getAllReels, getAllRods, getAllTwines } from "~/lib/cms";
import { sanityProductCategoryTitleMap } from "~/lib/formatters";

export const metadata = {
  title: "Anyagok",
  description:
    "Sárkány készítéshez és eresztéshez szükséges anyagok, 1984-óta.",
};

export default async function Materials() {
  const reels = await getAllReels();
  const rods = await getAllRods();
  const twines = await getAllTwines();

  return (
    <div className="material-pattern">
      <div className="container space-y-10 p-8">
        <h1 className="text-center font-bold">Anyagok</h1>
        <div className="space-y-8">
          {reels && reels.length > 0 && (
            <div className="space-y-4">
              <h2 className="font-bold">
                {sanityProductCategoryTitleMap.reel}
              </h2>
              <ProductContainer>
                {reels.map((reel) => (
                  <ReelCard reel={reel} key={reel._id} />
                ))}
              </ProductContainer>
            </div>
          )}
          {twines && twines.length > 0 && (
            <div className="space-y-4">
              <h2 className="font-bold">
                {sanityProductCategoryTitleMap.twine}
              </h2>
              <ProductContainer>
                {twines.map((twine) => (
                  <TwineCard twine={twine} key={twine._id} />
                ))}
              </ProductContainer>
            </div>
          )}
          {rods && rods.length > 0 && (
            <div className="space-y-4">
              <h2 className="font-bold">{sanityProductCategoryTitleMap.rod}</h2>
              <ProductContainer>
                {rods.map((rod) => (
                  <RodCard rod={rod} key={rod._id} />
                ))}
              </ProductContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
