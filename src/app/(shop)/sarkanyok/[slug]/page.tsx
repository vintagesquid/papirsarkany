import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import AddToCartButton from "~/components/add-to-cart-button";
import Heading from '~/components/heading';
import { getAllKites, getKiteBySlug } from "~/lib/cms";
import { MISSING_IMG_URL, NO_NAME } from "~/lib/constants";
import { currencyFormatter } from "~/lib/formatters";
import { getPositionFromHotspot } from "~/lib/sanity-image";

type Params = {
  slug: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata | null> {
  const { slug } = await params;

  const kite = await getKiteBySlug(slug);

  if (!kite) {
    return null;
  }

  return {
    title: `${kite.name}`,
    description: kite.description || `${kite.name} egyzsinóros sárkány`,
    openGraph: {
      images: kite.image?.asset?.url || undefined,
    },
  };
}

export async function generateStaticParams(): Promise<Partial<Params>[]> {
  const kites = await getAllKites();

  return kites.map((kite) => ({
    slug: kite.slug?.current,
  }));
}

export default async function Kite(props: { params: Promise<Params> }) {
  const params = await props.params;
  const kite = await getKiteBySlug(params.slug);

  if (!kite) {
    notFound();
  }

  return (
    <div className="h-full space-y-8 p-8 md:flex md:gap-4 md:space-y-0">
      <div className="md:flex-3">
        {kite.image && (
          <Image
            className="mx-auto rounded-lg object-cover md:h-full md:w-fit"
            style={{
              objectPosition: getPositionFromHotspot(kite.image.hotspot),
            }}
            src={kite.image.asset?.url || MISSING_IMG_URL}
            width={kite.image.asset?.metadata?.dimensions?.width}
            height={kite.image.asset?.metadata?.dimensions?.height}
            alt={kite.name || NO_NAME}
            placeholder="blur"
            blurDataURL={kite.image.asset?.metadata?.lqip}
            fetchPriority="high"
            priority
          />
        )}
      </div>
      <div className="space-y-4 md:flex-2 md:space-y-8">
        <div className="text-center md:text-left">
          <Heading as='h1' className="font-bold">{kite.name}</Heading>
          {kite.isBeginner && (
            <Heading as='h2' size={3} className="font-bold text-primary underline underline-offset-8">
              Kezdőknek ajánlott!
            </Heading>
          )}
        </div>
        <div className="space-y-2 text-center md:text-left">
          {kite.price && (
            <Heading as={'h2'} className="font-bold text-primary">
              {currencyFormatter(kite.price)}
            </Heading>
          )}
          <AddToCartButton product={kite} />
        </div>
        <div className="space-y-1">
          {kite.size && (
            <Heading as='h3'>
              <b>Méret: </b>
              {kite.size}
            </Heading>
          )}
          {kite.materials && kite.materials?.length > 0 && (
            <Heading as='h3'>
              <b>Anyagok: </b>
              {kite.materials.join(", ")}
            </Heading>
          )}
          {kite.windSpeed && (
            <Heading as='h3'>
              <b>Szél: </b>
              {kite.windSpeed}
            </Heading>
          )}
          <Heading as='h4'>{kite.description}</Heading>
        </div>
      </div>
    </div>
  );
}
