import { type CreateEmailOptions, Resend } from "resend";
import CustomerEmail from "../../emails/customer";
import VendorEmail from "../../emails/vendor";
import { env } from "./env";
import type { OrderMail } from "./types";

const { EMAIL_SERVICE_API_KEY } = env;
const resend = new Resend(EMAIL_SERVICE_API_KEY);

export async function sendEmail(mailData: CreateEmailOptions) {
  await resend.emails.send(mailData);

  console.log(`Email is sent to ${mailData.to}`);
}

export async function sendOrderEmails(orderEmailData: OrderMail) {
  const { VENDOR_EMAIL_ADDRESS } = env;

  const vendorMail: CreateEmailOptions = {
    from: "mail@papirsarkany.hu",
    replyTo: VENDOR_EMAIL_ADDRESS,
    to: VENDOR_EMAIL_ADDRESS,
    subject: `Rendelés #${orderEmailData.orderId}`,
    react: VendorEmail({
      orderId: orderEmailData.orderId,
      contact: orderEmailData.contact,
      products: orderEmailData.products,
      shippingOption: orderEmailData.shippingOption,
      paymentOption: orderEmailData.paymentOption,
      billing: orderEmailData.billing,
      shipping: orderEmailData.shipping,
      comment: orderEmailData.comment,
      total: orderEmailData.total,
      shippingFee: orderEmailData.shippingFee,
      billingFee: orderEmailData.billingFee,
    }),
  };

  const customerMail: CreateEmailOptions = {
    from: "mail@papirsarkany.hu",
    replyTo: VENDOR_EMAIL_ADDRESS,
    to: orderEmailData.contact.email,
    subject: "Köszönöm rendelését - papirsarkany.hu",
    react: CustomerEmail({
      orderId: orderEmailData.orderId,
      contact: orderEmailData.contact,
      products: orderEmailData.products,
      shippingOption: orderEmailData.shippingOption,
      paymentOption: orderEmailData.paymentOption,
      billing: orderEmailData.billing,
      shipping: orderEmailData.shipping,
      comment: orderEmailData.comment,
      shippingFee: orderEmailData.shippingFee,
      billingFee: orderEmailData.billingFee,
      total: orderEmailData.total,
    }),
  };

  await resend.batch.send([vendorMail, customerMail]);
}
