import type { Kite } from "@sanity/lib/sanity.types";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import { NO_NAME } from "~/lib/constants";
import { currencyFormatter } from "~/lib/formatters";
import { getPositionFromHotspot, urlFor } from "~/lib/sanity-image";
import type { WithImageAsset } from "~/lib/types";
import AddToCartButton from "./add-to-cart-button";
import Heading from "./heading";
import HoverAnimatedCard from "./hover-animated-card";

type KiteCardProps = {
  kite: WithImageAsset<Kite>;
};

const KiteCard: FC<KiteCardProps> = ({ kite }) => {
  return (
    <Link
      href={`/sarkanyok/${kite.slug?.current}`}
      className="relative z-0 cursor-pointer"
      prefetch
    >
      <HoverAnimatedCard
        tabIndex={-1}
        className="h-full w-full p-3 sm:p-4 md:p-5"
      >
        <div className="flex h-full flex-col justify-between gap-3">
          <div>
            <Heading as="h3" className="text-center font-bold">
              {kite.name}
            </Heading>

            {kite.isBeginner && (
              <div className="text-center font-bold text-primary underline">
                Kezdőknek ajánlott!
              </div>
            )}
          </div>

          <div className="space-y-3">
            {kite.image && (
              <Image
                src={urlFor(kite.image).size(600, 600).url()}
                style={{
                  objectPosition: getPositionFromHotspot(kite.image.hotspot),
                }}
                alt={kite.name || NO_NAME}
                width={600}
                height={600}
                placeholder="blur"
                blurDataURL={kite.image.asset?.metadata?.lqip}
                loading="lazy"
                className={"mx-auto aspect-squares rounded-lg object-cover"}
              />
            )}
            <Heading as="h3" className="text-center font-bold text-primary">
              {currencyFormatter(kite.price || 0)}
            </Heading>
          </div>

          <div className="flex justify-end">
            <AddToCartButton product={kite} />
          </div>
        </div>
      </HoverAnimatedCard>
    </Link>
  );
};

export default KiteCard;
