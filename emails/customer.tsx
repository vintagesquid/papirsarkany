import {
  Container,
  Font,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Text,
} from "@react-email/components";
// biome-ignore lint/correctness/noUnusedImports: must import in react-email components
import * as React from "react";
import OrderSummarySection from 'react-email/components/order-summary-section';
import type { OrderMail } from "~/lib/types";
import { kiteMock } from "~/mocks/product.mock";


type CustomerEmailProps = OrderMail;

const CustomerEmail = ({
  orderId,
  contact,
  billing,
  paymentOption,
  shipping,
  shippingFee,
  shippingOption,
  billingFee,
  comment,
  products,
  total,
}: CustomerEmailProps) => {
  return (
    <Html>
      <Head>
        <title> Köszönöm rendelését! - papirsarkany.hu</title>
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
      <Container style={{ padding: "0 12px" }}>
        <Heading style={{ textAlign: "center" }} as="h1">
          Köszönöm rendelését!
        </Heading>

        <Text>
          Tisztelt {contact.lastName} {contact.firstName}!
          <br />
          <br />
          Köszönöm a{" "}
          <Link href="https://www.papirsarkany.hu/">papirsarkany.hu</Link>-n
          leadott rendelését. Hamarosan felveszem önnel a kapcsolatot.
          <br />
          <br />
          Rendelés szám: <b>{orderId}</b>
          <br />
          <br />
          <b>
            Ha elküldött rendelésére nem küldök valaszt, kérem rendelését
            továbbítsa a papirsarkany@fazekas.hu címre, vagy hívjon a
            +36&nbsp;30&nbsp;9754&nbsp;786 telefonszámon!
          </b>
        </Text>

        {paymentOption === "Előreutalással" && (
          <Text>
            <b>Számlaszámom</b>: Ducsai Barnabás Erste Bank
            11600006-00000000-76709302
          </Text>
        )}

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

        <OrderSummarySection
          products={products}
          shippingFee={shippingFee}
          billingFee={billingFee}
          total={total}
        />
      </Container>
    </Html>
  );
};

CustomerEmail.PreviewProps = {
  orderId: 1,
  products: [
    {
      name: kiteMock.name,
      price: "24 000 Ft",
      quantity: "2",
      imageUrl: kiteMock.image.asset.url,
      url: "https://papirsarkany.vercel.app/sarkanyok/forgo-szelzsak",
    },
    {
      name: kiteMock.name,
      price: "24 000 Ft",
      quantity: "2",
      url: "https://papirsarkany.vercel.app/sarkanyok/forgo-szelzsak",
    },
  ],
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
  paymentOption: "Előreutalással",
  billing: {
    postcode: "1025",
    city: "Budapest",
    address: "Felső Zöldmáli út 13",
    subaddress: "",
  },
  billingFee: "2 000 Ft",
  comment: "",
} as CustomerEmailProps;

export default CustomerEmail;
