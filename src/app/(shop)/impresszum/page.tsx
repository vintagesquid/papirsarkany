import type { FC } from "react";

import Card from "~/components/card";

const ImpressiumPage: FC = () => {
  return (
    <div className="container">
      <Card className="prose prose-slate lg:prose-lg mx-auto max-w-[100ch] p-8">
        <h1 className="text-center">Impresszum</h1>

        <h2>Cégnév: Ducsai Barnabás</h2>
        <h2>Adószám: 61090938-1-33</h2>
        <h2>Székhely és levelezési cím: 2094 Nagykovácsi Kazal utca 6.</h2>
        <h2>Telefonszám: 06-1-123-4567</h2>
        <h2>E-mail cím: mail.papirsarkany@gmail.com</h2>
        <h2>Bankszámlaszám: 11600006-00000000-76709302</h2>
      </Card>
    </div>
  );
};

export default ImpressiumPage;
