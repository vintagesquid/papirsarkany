import type { Metadata } from "next";
import type { FC } from "react";

import Card from "~/components/card";
import Heading from "~/components/heading";
import { getContact } from "~/lib/cms";

export const metadata: Metadata = {
  title: "Impresszum",
  description: "papirsarkany.hu impresszum oldal. Elérhetőségek, cégadatok.",
};

const ImpressiumPage: FC = async () => {
  const contact = await getContact();

  if (!contact) {
    return null;
  }

  return (
    <div className="container">
      <Card className="prose prose-slate lg:prose-lg wrap-anywhere mx-auto max-w-[100ch] p-8">
        <Heading as="h1" className="text-center">
          Impresszum
        </Heading>

        <Heading as={"h3"}>Cégnév: {contact.name}</Heading>
        <Heading as={"h3"}>Adószám: {contact.taxId}</Heading>
        <Heading as={"h3"}>
          Székhely és levelezési cím: {contact.fullAddress}
        </Heading>
        <Heading as={"h3"}>Telefonszám: {contact.phoneNumber}</Heading>
        <Heading as={"h3"}>E-mail cím: {contact.email}</Heading>
        <Heading as={"h3"}>
          Bankszámlaszám: {contact?.bankAccountNumber}
        </Heading>
      </Card>
    </div>
  );
};

export default ImpressiumPage;
