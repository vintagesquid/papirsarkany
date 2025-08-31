import type { Reel } from "@sanity/lib/sanity.types";
import Image from "next/image";
import type { FC } from "react";
import { MISSING_IMG_URL, NO_NAME } from "~/lib/constants";
import { currencyFormatter } from "~/lib/formatters";
import type { WithImageAsset } from "~/lib/types";
import AddToCartButton from "./add-to-cart-button";
import Card from "./card";
import Heading from './heading';

type ReelCardProps = {
  reel: WithImageAsset<Reel>;
};

const ReelCard: FC<ReelCardProps> = ({ reel }) => {
  return (
    <Card className="flex w-full flex-col justify-between gap-3 p-5">
      <div>
        <Heading as='h3' className="text-center font-bold">{reel.name}</Heading>
      </div>

      {reel.image && (
        <Image
          src={reel.image.asset?.url || MISSING_IMG_URL}
          alt={reel.name || NO_NAME}
          width={reel.image.asset?.metadata?.dimensions?.width}
          height={reel.image.asset?.metadata?.dimensions?.height}
          placeholder="blur"
          blurDataURL={reel.image.asset?.metadata?.lqip}
          className="mx-auto mb-6 max-h-32 rounded-lg object-contain"
        />
      )}

      {reel.price && (
        <Heading as='h3' className="text-center font-bold text-primary">
          {currencyFormatter(reel.price)}
        </Heading>
      )}

      <div className="flex justify-end">
        <AddToCartButton product={reel} />
      </div>
    </Card>
  );
};

export default ReelCard;
