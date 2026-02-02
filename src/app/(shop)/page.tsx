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
          </HomeSection.Content>
        </HomeSection>
      </div>
    </div>
  );
}
