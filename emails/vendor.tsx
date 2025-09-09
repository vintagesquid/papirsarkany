import {
  Button,
  Container,
  Font,
  Head,
  Heading,
  Hr,
  Html,
  Section,
  Text,
} from "@react-email/components";
// biome-ignore lint/correctness/noUnusedImports: must import in react-email components
import * as React from "react";
import type { ShippingOptionValue } from "~/lib/types";
import { kiteMock } from "~/mocks/product.mock";

type VendorEmailProps = {
  orderId: number | string;
  contact: {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
  };
  shippingOption: ShippingOptionValue;
  paymentOption: string;

  shipping: {
    postcode?: string;
    city?: string;
    address?: string;
    subaddress?: string;
  };
  shippingFee: string | null;
  billing: {
    postcode: string;
    city: string;
    address: string;
    subaddress?: string;
  };
  billingFee: string | null;
  comment: string | undefined;

  products: {
    name: string;
    price: string;
    quantity: string;
  }[];
  total: string;
};

const VendorEmail = ({
  orderId,
  contact,
  shipping,
  paymentOption,
  shippingFee,
  shippingOption,
  billing,
  billingFee,
  comment,
  products,
  total,
}: VendorEmailProps) => {
  return (
    <Html>
      <Head>
        <title>Rendelés #{orderId} - papirsarkany.hu</title>
        <Font
          fontFamily="Inter"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/inter/v19/UcC73FwrK3iLTeHuS_fjbvMwCp504jAa2JL7W0Q5n-wU.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Container>
        <Heading style={{ textAlign: "center" }} as="h1">
          Rendelés #{orderId}
        </Heading>

        <Hr />

        <Text>
          <b>Elérhetőség:</b> {contact.email}
          <br />
          <b>Név:</b> {contact.lastName} {contact.firstName}
          <br />
          <b>Telefonszám:</b> {contact.phone}
        </Text>

        <Text>
          <b>Szállítási mód:</b> {shippingOption}
          <br />
          <b>Fizetési mód:</b> {paymentOption}
          <br />
        </Text>

        <Text>
          <b>Számlázási cím:</b> {billing.postcode} {billing.city}{" "}
          {billing.address} {billing.subaddress}
          {shippingOption !== "Személyes átvétel" && (
            <>
              <br />
              <b>Szállítási cím</b> {shipping.postcode} {shipping.city}{" "}
              {shipping.address} {shipping.subaddress}
            </>
          )}
        </Text>

        {comment && (
          <Text>
            <b>Megjegyzés:</b> {comment}
          </Text>
        )}

        <ul>
          {products.map((product) => (
            <li key={product.name}>
              <Text style={{ fontSize: "18px" }}>
                <b>
                  {product.name}: {product.price} - {product.quantity} db
                </b>
              </Text>
            </li>
          ))}

          {shippingFee && (
            <li>
              <Text style={{ fontSize: "18px" }}>
                <b>Szállítás díj: {shippingFee} Ft</b>
              </Text>
            </li>
          )}

          {billingFee && (
            <li>
              <Text style={{ fontSize: "18px" }}>
                <b>Utánvét díj: {billingFee} Ft</b>
              </Text>
            </li>
          )}
        </ul>

        <Hr />

        <Text style={{ fontSize: "24px" }}>
          <u>
            <b>Összesen: {total}</b>
          </u>
        </Text>

        <Section style={{ textAlign: "center" }}>
          <Button
            href={`mailto:${contact.email}`}
            style={{
              background: "#0e7daf",
              color: "#ffffff",
              padding: "12px 20px",
              borderRadius: 6,
            }}
          >
            Kapcsolat felvétele a vásárlóval
          </Button>
        </Section>
      </Container>
    </Html>
  );
};

VendorEmail.PreviewProps = {
  orderId: 1,
  products: [{ name: kiteMock.name, price: "12 000 Ft", quantity: "2" }],
  total: "24 000 Ft",
  contact: {
    email: "kulka.janos@test.com",
    firstName: "János",
    lastName: "Kulka",
    phone: "+36201234567",
  },
  shippingOption: "Postai szállítás",
  shipping: {
    postcode: "1025",
    city: "Budapest",
    address: "Felső Zöldmáli út 13",
    subaddress: "",
  },
  shippingFee: "1 500 Ft",
  paymentOption: "Előre utalás",
  billing: {
    postcode: "1025",
    city: "Budapest",
    address: "Felső Zöldmáli út 13",
    subaddress: "",
  },
  billingFee: null,
  comment: "",
} as VendorEmailProps;

export default VendorEmail;
