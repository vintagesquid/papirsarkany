import type { Metadata } from "next";
import type { FC } from "react";
import Card from "~/components/card";
import Heading from "~/components/heading";
import { getContact } from "~/lib/cms";

export const metadata: Metadata = {
  title: "Visszavásárlási tájékoztató",
  description:
    "Visszavásárlási (elállási) tájékoztató a Papírsárkány webáruházhoz.",
};

const ProductReturnPolicyPage: FC = async () => {
  const contact = await getContact();
  
  if(!contact) {
    return null;
  }

  return (
    <div className="container py-8 md:py-16">
      <Card className="prose prose-slate lg:prose-lg mx-auto max-w-[120ch] p-8">
        <Heading as="h1" size={2} className="text-center">
          {" "}
          Visszavásárlási (elállási) tájékoztató
        </Heading>
        <h2>
          Köszönjük, hogy a Papírsárkány webáruházat választotta! 
          
        </h2>

        <h3>Az alábbi
          tájékoztatóban talál minden tudnivalót a termékek visszaküldéséről,
          elállási jogról, a visszatérítési folyamatról és a hibás teljesítés
          eseteiről.</h3>

        <h3>1. Székhely és elérhetőségek</h3>

        <ul>
          <li>Cég: {contact.name}</li>
          <li>
            Székhely: {contact.fullAddress}
          </li>
          <li>
            {" "}
            E-mail: <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </li>

          <li>
            Telefon:{" "}
            <a href={`tel:${contact.phoneNumber}`}>{contact.phoneNumber}</a>
          </li>
        </ul>

        <h3>2. A fogyasztói elállási jog röviden</h3>

        <ul>
          <li>
            A vásárlónak (fogyasztónak) — ha nem üzlethelyiségben, hanem
            távollevők között kötött szerződés (pl. webáruház) alapján vásárol —
            joga van indokolás nélkül elállni a szerződéstől 14 napon belül.
          </li>
          <li>
            A 14 napos határidő az áru átvételétől (vagy többtermékes rendelés
            esetén az utolsó áru átvételétől) számít.
          </li>
        </ul>

        <h3>3. Mikor élhet az elállási jogával?</h3>

        <ul>
          <li>
            Ha a terméket megrendelte és az kézhezvételt követően úgy dönt, hogy
            nem szeretné megtartani, 14 napon belül elállhat a vásárlástól.
          </li>

          <li>
            Az elállási jog gyakorlásához küldjön egyértelmű nyilatkozatot.
          </li>
        </ul>

        <h3>4. A termék visszaküldésének feltételei</h3>
        <ul>
          <li>
            A visszaküldés általában a vásárló költségére történik, kivéve hibás
            teljesítésnél.
          </li>
        </ul>

        <h3>5. Mire figyeljen a visszaküldésnél?</h3>
        <p>
          Használjon nyomon követhető csomagküldési módot (ajánlott), és
          tüntesse fel a rendelés számát a csomagban.
        </p>

        <h3>6. Visszatérítés módja és határidő</h3>
        <p>
          A termék beérkezését és ellenőrzését követően 14 napon belül
          visszatérítjük a vételárat a vásárláskor használt fizetési módra. A
          banki visszafizetés időtartama a bankoktól függően eltérő lehet.
        </p>

        <h3>7. Visszatérítés összege</h3>
        <p>
          A visszatérített összeg általában tartalmazza a termék vételárát
          és—amennyiben az egész rendelés visszaküldésre kerül—a rendeléshez
          kapcsolódó alap postaköltséget. A visszaküldés költsége a vásárlót
          terheli, kivéve hibás teljesítés esetén.
        </p>

        <h3>8. Hibás teljesítés, jótállás és szavatosság</h3>
        <p>
          Hibás termék esetén kérjük, haladéktalanul jelezze e-mailben vagy
          telefonon. Hibás teljesítés esetén jogosult lehet javítást, cserét
          vagy a szerződéstől való elállást kérni. A jótállás részleteit a
          számlán és a termékoldalon találja.
        </p>

        <h3>9. Ügyintézés lépései (összefoglaló)</h3>
        <ol>
          <li>
            Értesítse ügyfélszolgálatunkat e‑mailben:{" "}
            <a href={`mailto:${contact.email}`}>{contact.email}</a>.
          </li>
          <li>Csomagolja be a terméket eredeti állapotában.</li>
          <li>
            Küldje vissza a csomagot nyomon követhető módon a fenti címre.
          </li>
          <li>
            A beérkezés és ellenőrzés után 14 napon belül intézzük a
            visszatérítést.
          </li>
        </ol>
      </Card>
    </div>
  );
};

export default ProductReturnPolicyPage;
