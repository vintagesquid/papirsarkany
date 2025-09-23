import Link from "next/link";
import { getGoogleMapsRating } from "~/lib/google-cloud";
import GoogleMapsRating from "./google-maps-rating";
import Heading from "./heading";
import News from "./news";

const Splash = async () => {
  const { rating, userRatingCount } = await getGoogleMapsRating();

  return (
    <div className="splash-pattern grid min-h-[calc(100dvh-68px)] justify-center bg-bottom bg-cover bg-no-repeat sm:min-h-[calc(100dvh-72px)] lg:min-h-[calc(100dvh-76px)]">
      <div className="h-fit justify-center gap-4 space-y-6 pt-16 pb-32 text-center text-white">
        <div>
          <Link
            href="https://www.google.com/search?sa=X&sca_esv=0e45d3c299f99f39&sca_upv=1&hl=hu&gl=HU&tbm=lcl&sxsrf=ADLYWIJVzQwn0x4-EL1c9BaWy9jmaiGLjw:1726527988481&q=www.papirsarkany.hu+V%C3%A9lem%C3%A9nyek&rflfq=1&num=20&stick=H4sIAAAAAAAAAONgkxIxNLE0NDQ2NTY3M7MwNrU0MzcwMtrAyPiKUaG8vFyvILEgs6g4sSg7Ma9SL6NUIezwypzU3MMr8ypTsxexElQCAH5O8rJhAAAA&rldimm=14911353766835967022&ved=2ahUKEwj408r7yciIAxUl_rsIHQsOGLoQ9fQKegQIVxAF&biw=1708&bih=1059&dpr=2#lkt=LocalPoiReviews"
            target="_blank"
            title={`${userRatingCount} vélemény`}
          >
            <GoogleMapsRating rating={rating} />
          </Link>
        </div>
        <div className="space-y-4 sm:space-y-12">
          <div className="space-y-2">
            <Heading as="h1" className="font-bold max-[369px]:text-2xl">
              www.papirsarkany.hu
            </Heading>

            <Link href={"/sarkanyok"}>
              <Heading as="h2" size={1} className="font-semibold underline">
                Papírsárkány árusítás 1984-óta.
              </Heading>
            </Link>
          </div>

          <News />
        </div>
      </div>
    </div>
  );
};

export default Splash;
