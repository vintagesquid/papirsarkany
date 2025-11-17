import type { Metadata } from "next";
import type { FC } from "react";
import Card from "~/components/card";
import Heading from "~/components/heading";

export const metadata: Metadata = {
  title: "Adatvédelmi Nyilatkozat és Felhasználási Feltételek",
  description: "papirsarkany.hu adatvédelmi nyilatkozata és felhasználási feltételei.",
};

const TermsAndConditionsPage: FC = () => {
  return (
    <div className="container py-8 md:py-16">
      <Card className="prose prose-slate lg:prose-lg mx-auto max-w-[120ch] p-8">
        <Heading as="h1" size={3} className="text-center font-bold">
          Adatvédelmi Nyilatkozat és Felhasználási Feltételek
        </Heading>
        <h3>1. Általános rendelkezések</h3>
        <p>
          Jelen Adatvédelmi Nyilatkozat és Felhasználási Feltételek (a
          továbbiakban: „Nyilatkozat”) szabályozza a vásárlók által megadott
          személyes adatok kezelését, valamint az online vásárlási folyamat
          feltételeit.
        </p>
        <h3>2. Személyes adatok kezelése</h3>
        <p>
          A rendelés leadásával Ön hozzájárul ahhoz, hogy az alábbi személyes
          adatokat kezeljük és tároljuk:
        </p>
        <ul>
          <li>Név</li>
          <li>Email cím</li>
          <li>Telefonszám</li>
          <li>Szállítási cím (irányítószám, város, cím, másodlagos cím)</li>
          <li>Számlázási cím (irányítószám, város, cím, másodlagos cím)</li>
        </ul>
        <h3>3. Az adatkezelés célja</h3>
        <p>
          Az Ön által megadott személyes adatokat kizárólag a rendelés
          teljesítése és az Önnel való kommunikáció céljából használjuk fel.
          Adatait harmadik fél részére nem továbbítjuk, kivéve, ha az a rendelés
          teljesítéséhez szükséges (pl. futárszolgálat).
        </p>
        <h3>4. Adatbiztonság</h3>
        <p>
          Biztosítjuk, hogy az Ön személyes adatait bizalmasan kezeljük, és
          minden szükséges technikai és szervezési intézkedést megteszünk azok
          védelme érdekében.
        </p>
        <h3>5. Az adatok megőrzési ideje</h3>
        <p>
          Az Ön személyes adatait a törvény által előírt időtartamig tároljuk.
          Az adatokat a rendelés teljesítését követően, illetve jogi
          kötelezettségünk teljesítése érdekében őrizzük meg.
        </p>
        <h3>6. Az Ön jogai</h3>
        <p>
          Ön jogosult tájékoztatást kérni arról, hogy milyen személyes adatokat
          kezelünk Önről, továbbá kérheti az adatok helyesbítését, törlését vagy
          kezelésének korlátozását. Kérheti továbbá adatai hordozhatóságát és
          tiltakozhat az adatkezelés ellen.
        </p>
        <h3>7. Hozzájárulás</h3>
        <p>
          A rendelés leadásával Ön kifejezetten hozzájárul ahhoz, hogy személyes
          adatait az itt meghatározott célokra kezeljük.
        </p>
        <h3>8. Jogorvoslat</h3>
        <p>
          Amennyiben úgy véli, hogy adatkezelésünk során megsértettük a jogait,
          Ön jogosult panaszt tenni a Nemzeti Adatvédelmi és Információszabadság
          Hatóságnál (NAIH) vagy jogi úton érvényesíteni igényét.
        </p>
        <h3>9. Záró rendelkezések</h3>
        <p>
          Jelen Nyilatkozat módosítása jogunkban áll, de erről minden esetben
          tájékoztatjuk Önt. Az aktuális verzió mindig elérhető weboldalunkon.
        </p>
        <p>
          <strong>Elfogadás</strong>: A „Megrendelem” gomb megnyomásával Ön
          elfogadja a jelen Adatvédelmi Nyilatkozat és Felhasználási Feltételek
          tartalmát, és hozzájárul személyes adatainak az itt leírtak szerinti
          kezeléséhez.
        </p>
      </Card>
    </div>
  );
};

export default TermsAndConditionsPage;
