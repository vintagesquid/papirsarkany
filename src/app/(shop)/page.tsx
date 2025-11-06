import Link from "next/link";

import AboutBusinessIcon from "~/assets/about-business.svg";
import ContactIcon from "~/assets/contact.svg";
import CraftingIcon from "~/assets/crafting.svg";
import EmphasizedText from "~/components/emphasized-text";
import Heading from "~/components/heading";
import HomeSection from "~/components/home-section";
import Splash from "~/components/splash";
import { getContact } from "~/lib/cms";

// revalidate page every day
export const revalidate = 86400;

export default async function HomePage() {
  const contact = await getContact();

  if (!contact) {
    return null;
  }

  return (
    <div>
      <Splash />

      <div>
        <HomeSection id="vallalkozas">
          <HomeSection.Icon>
            <AboutBusinessIcon />
          </HomeSection.Icon>
          <HomeSection.Content>
            <Heading as="h3" size={1} className="text-center font-bold">
              A vállalkozásról
            </Heading>

            <Heading as={"h4"} size={2}>
              <EmphasizedText>Üzletem nincs</EmphasizedText>, ezért{" "}
              <EmphasizedText>postai utánvétellel</EmphasizedText> szállítok,
              melynek költsége a megrendelőt terheli.
              <br />
              <EmphasizedText>
                Személyesen{" "}
                <Link
                  className="underline underline-offset-4"
                  href="#elerhetoseg"
                >
                  Nagykovácsiban
                </Link>
              </EmphasizedText>{" "}
              (63-as BKV busszal megközelíthető) is vásárolhat
            </Heading>

            <Heading as={"h4"} size={2}>
              Sárkányaim repülési és{" "}
              <EmphasizedText>nyolc napos</EmphasizedText> pénzvisszafizetési
              garanciával kaphatók.
              <br />A visszaküldés költsége a vevőt terheli.
              <br />
              Minden érdeklődőnek telefonos időpont egyeztetés után{" "}
              <EmphasizedText>egy óra ingyenes oktatás</EmphasizedText> sárkány
              biztosításával &mdash; vásárlási kötelezettség nélkül &mdash;{" "}
              <EmphasizedText>Nagykovácsiban</EmphasizedText>.
              <br />
              <EmphasizedText>
                Mindenkinek kellemes sárkányeresztést kívánok!
              </EmphasizedText>
            </Heading>

            <div>
              <Heading as={"h4"} size={2} className="font-bold">
                {contact.name}
              </Heading>
              <Heading as={"h5"} size={3}>
                <b>Adószám:</b> {contact.taxId}
                <br />
                <b>Számlaszám:</b> {contact.bankAccountNumber}
              </Heading>
            </div>
          </HomeSection.Content>
        </HomeSection>

        <HomeSection id="sarkany-keszites">
          <HomeSection.Icon>
            <CraftingIcon />
          </HomeSection.Icon>
          <HomeSection.Content>
            <Heading as={"h3"} size={1} className="text-center font-bold">
              Sárkányépítő foglalkozások
            </Heading>

            <Heading as={"h4"} size={2}>
              A{" "}
              <EmphasizedText inverse>
                sárkánykészítés és -repítés
              </EmphasizedText>{" "}
              régebben mindennapos dolog volt a gyerekek hétköznapjaiban. Ez a
              &quot;tudomány&quot; apáról fiúra szállt, illetve a nagyobbaktól
              lesték el a kisebbek. A gyerekek mára elfelejtették ezt a szép
              régi játékot.
            </Heading>

            <Heading as={"h4"} size={2}>
              Vállalom{" "}
              <EmphasizedText inverse>
                sárkányépítő foglalkozások
              </EmphasizedText>{" "}
              vezetését gyerekrendezvények, -intézmények és céges rendezvények
              számára.
              <br />
              Anyagot biztosítok.
              <br />
              (Szelet a megrendelő biztosít.)
              <br />
              Ár egyedi megállapodás alapján.
            </Heading>
          </HomeSection.Content>
        </HomeSection>

        <HomeSection id="elerhetoseg">
          <HomeSection.Icon>
            <ContactIcon />
          </HomeSection.Icon>

          <HomeSection.Content>
            <Heading as={"h3"} size={1} className="text-center font-bold">
              Elérhetőség
            </Heading>

            <div className="text-center font-semibold">
              <Heading as={"h4"}>{contact.email}</Heading>
              <Heading as={"h4"}>{contact.phoneNumber}</Heading>
            </div>

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1131.6105816797208!2d18.87852618960264!3d47.57870829362802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xceefc53f4870d42e!2swww.papirsarkany.hu!5e0!3m2!1shu!2shu!4v1579197549648!5m2!1shu!2shu"
              className="mx-auto h-[600px] w-full max-w-6xl rounded-xl border-3"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google map"
            />
          </HomeSection.Content>
        </HomeSection>
      </div>
    </div>
  );
}
