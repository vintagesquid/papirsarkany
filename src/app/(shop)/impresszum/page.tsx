import type { FC } from "react";

import Card from "~/components/card";
import Heading from "~/components/heading";

// import Heading from '~/components/heading';

const ImpressiumPage: FC = () => {
  return (
    <div className="container">
      <Card className="prose prose-slate lg:prose-lg mx-auto max-w-[100ch] p-8">
        <Heading as="h1" className="text-center">
          Impresszum
        </Heading>

        <Heading as={"h2"}>Cégnév: Ducsai Barnabás</Heading>
        <Heading as={"h2"}>Adószám: 61090938-1-33</Heading>
        <Heading as={"h2"}>
          Székhely és levelezési cím: 2094 Nagykovácsi Kazal utca 6.
        </Heading>
        <Heading as={"h2"}>Telefonszám: 06-1-123-4567</Heading>
        <Heading as={"h2"}>E-mail cím: mail.papirsarkany@gmail.com</Heading>
        <Heading as={"h2"}>Bankszámlaszám: 11600006-00000000-76709302</Heading>
      </Card>
    </div>
  );
};

export default ImpressiumPage;
