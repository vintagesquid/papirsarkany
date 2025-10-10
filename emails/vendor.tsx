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
import OrderSummarySection from "react-email/components/order-summary-section";
import type { OrderMail } from "~/lib/types";
import { kiteMock } from "~/mocks/product.mock";

type VendorEmailProps = OrderMail;

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
        <title>{`Rendelés #${orderId} - papirsarkany.hu`}</title>
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

        <OrderSummarySection
          products={products}
          billingFee={billingFee}
          shippingFee={shippingFee}
          total={total}
        />

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
  shippingFee: "",
  paymentOption: "Előreutalással",
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
