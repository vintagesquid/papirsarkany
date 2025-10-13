import {
  Column,
  Hr,
  Img,
  Link,
  Row,
  Section,
  Text,
} from "@react-email/components";
import type { FC } from "react";
import type { OrderMail } from "~/lib/types";

type ProductListProps = {
  products: OrderMail["products"];
  shippingFee: OrderMail["shippingFee"];
  billingFee: OrderMail["billingFee"];
  total: OrderMail["total"];
};

const OrderSummarySection: FC<ProductListProps> = ({
  products,
  billingFee,
  shippingFee,
  total,
}) => {
  const hasProductImage = products.some((product) => product.imageUrl);

  return (
    <Section>
      {products.map((product) => (
        <Row key={product.name} style={{ marginBottom: "8px" }}>
          <Column
            style={{
              paddingRight: "10px",
              minWidth: hasProductImage ? 100 : "unset",
            }}
          >
            {product.imageUrl && (
              <Img
                src={product.imageUrl}
                alt={product.name}
                width="100"
                height="100"
              />
            )}
          </Column>
          <Column style={{ paddingRight: "10px" }}>
            <Text style={{ fontSize: "16px", verticalAlign: "middle" }}>
              <b>
                {product.url ? (
                  <Link href={product.url}>{product.name}</Link>
                ) : (
                  product.name
                )}
              </b>
            </Text>
          </Column>
          <Column style={{ paddingRight: "10px" }}>
            <Text style={{ fontSize: "16px", whiteSpace: "nowrap" }}>
              <b>{product.price}</b>
            </Text>
          </Column>
          <Column style={{ paddingRight: "10px" }}>
            <Text style={{ fontSize: "16px", whiteSpace: "nowrap" }}>
              <b>{product.quantity}db</b>
            </Text>
          </Column>
          <Column></Column>
        </Row>
      ))}

      {shippingFee && (
        <Row>
          <Column>
            <Text style={{ fontSize: "18px" }}>
              <b>Szállítás díj: {shippingFee}</b>
            </Text>
          </Column>
        </Row>
      )}

      {billingFee && (
        <Row>
          <Column>
            <Text style={{ fontSize: "18px" }}>
              <b>Utánvét díj: {billingFee}</b>
            </Text>
          </Column>
        </Row>
      )}

      <Hr />

      <Text style={{ fontSize: "24px" }}>
        <u>
          <b>Összesen: {total}</b>
        </u>
      </Text>
    </Section>
  );
};

export default OrderSummarySection;
