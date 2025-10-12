import { NextResponse } from "next/server";
import { getContact, getProductById } from "~/lib/cms";
import { CONTENT_TYPE_PATH_DIRECTORY_MAP } from "~/lib/constants";

import { createOrder } from "~/lib/db";
import { sendEmail, sendOrderEmails } from "~/lib/email";
import { env } from "~/lib/env";
import { currencyFormatter } from "~/lib/formatters";
import {
  createParcel,
  getFoxpostPackageSize,
  getTotalPackageInfo,
} from "~/lib/foxpost";
import { isProdEnv, isStageEnv, normalizeOrderForm } from "~/lib/helpers";
import type { OrderMail, OrderRequestBody } from "~/lib/types";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as OrderRequestBody;
    const { cart, formData, totalPrice, foxpostOperatorId } = body;

    const normalizedFormData = normalizeOrderForm(formData);

    const order = await createOrder(normalizedFormData, cart);

    if (isProdEnv() || isStageEnv()) {
      const orderEmailData: OrderMail = {
        orderId: order.id,
        contact: {
          email: normalizedFormData.email,
          firstName: normalizedFormData.firstName,
          lastName: normalizedFormData.lastName,
          phone: normalizedFormData.phoneNumber,
        },
        shippingOption: normalizedFormData.shippingOption,
        shipping: {
          postcode: normalizedFormData.shippingPostcode,
          city: normalizedFormData.shippingCity,
          address: normalizedFormData.shippingAddress,
          subaddress: normalizedFormData.shippingSubaddress,
        },
        paymentOption: normalizedFormData.paymentOption,
        billing: {
          postcode: normalizedFormData.billingPostcode,
          city: normalizedFormData.billingCity,
          address: normalizedFormData.billingAddress,
          subaddress: normalizedFormData.billingSubaddress,
        },
        comment: normalizedFormData.comment,
        products: await Promise.all(
          cart.map(async (cartItem) => {
            const product = await getProductById(cartItem._id);
            const productURL = new URL(
              product
                ? `${CONTENT_TYPE_PATH_DIRECTORY_MAP[product._type]}/${product.slug ?? ""}`
                : "",
              env.SITE_URL,
            );

            return {
              name: cartItem.name,
              price: currencyFormatter(cartItem.price),
              quantity: cartItem.quantity.toString(),
              imageUrl: cartItem.image?.asset?.url ?? null,
              url: productURL.href,
            };
          }),
        ),
        shippingFee:
          typeof body.shippingFee === "number"
            ? currencyFormatter(body.shippingFee)
            : body.shippingFee,
        billingFee: body.billingFee ? currencyFormatter(body.billingFee) : null,
        total: currencyFormatter(totalPrice),
      };

      await sendOrderEmails(orderEmailData);
    }

    if (
      normalizedFormData.shippingOption === "Foxpost automatába" &&
      foxpostOperatorId &&
      isProdEnv()
    ) {
      const foxpostResponse = await createParcel({
        cod:
          normalizedFormData.paymentOption === "Átvételkor bankártyával"
            ? totalPrice
            : 0,
        destination: foxpostOperatorId,
        recipientEmail: normalizedFormData.email,
        recipientName: `${normalizedFormData.lastName} ${normalizedFormData.firstName}`,
        recipientPhone: normalizedFormData.phoneNumber,
        size: getFoxpostPackageSize(getTotalPackageInfo(cart)) || "M",
      });

      const foxpostResponseBody = (await foxpostResponse.json()) as {
        valid: boolean;
        parcels: unknown[];
      };

      if (!foxpostResponse.ok || !foxpostResponseBody.valid) {
        throw new Error(foxpostResponse.statusText);
      }
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error(error);

    if (isProdEnv()) {
      const contact = await getContact();

      await sendEmail({
        from: contact.email,
        to: "balint.ducsai@gmail.com",
        subject: "error detected in papirsarkany.hu/api/order",
        text: `Error caught in url papirsarkany/api/order. \nreason: ${error}`,
      });
    }

    return NextResponse.json(
      { error: `Internal Server Error reason: ${error}}` },
      { status: 500 },
    );
  }
}
