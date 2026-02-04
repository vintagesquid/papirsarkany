import type { Order, Prisma } from "prisma/generated/client";
import prisma from "./prisma";
import type { CartItem, OrderForm } from "./validation-schemas";

export async function createOrder(
  orderForm: OrderForm,
  products: CartItem[],
): Promise<Order> {
  return await prisma.$transaction(async (tx) => {
    const user = await tx.customer.upsert({
      create: {
        email: orderForm.email,
        firstName: orderForm.firstName,
        lastName: orderForm.lastName,
        phone: orderForm.phoneNumber,

        shippingPostcode: orderForm.shippingPostcode,
        shippingCity: orderForm.shippingCity,
        shippingAddress: orderForm.shippingAddress,
        shippingSubaddress: orderForm.shippingSubaddress,
        billingPostcode: orderForm.billingPostcode,
        billingCity: orderForm.billingCity,
        billingAddress: orderForm.billingAddress,
        billingSubaddress: orderForm.billingSubaddress,
      },
      where: {
        email: orderForm.email,
      },
      update: {
        email: orderForm.email,
        firstName: orderForm.firstName,
        lastName: orderForm.lastName,
        phone: orderForm.phoneNumber,
      },
    });

    const order = await tx.order.create({
      data: {
        customerId: user.id,
        status: "Pending",
        shippingMode: orderForm.shippingOption,
        paymentMode: orderForm.paymentOption,
        comment: orderForm.comment,

        shippingPostcode: orderForm.shippingPostcode,
        shippingCity: orderForm.shippingCity,
        shippingAddress: orderForm.shippingAddress,
        shippingSubaddress: orderForm.shippingSubaddress,
        billingPostcode: orderForm.billingPostcode,
        billingCity: orderForm.billingCity,
        billingAddress: orderForm.billingAddress,
        billingSubaddress: orderForm.billingSubaddress,
      },
    });

    const orderItemsToCreate: Prisma.OrderItemUncheckedCreateInput[] = [];
    for (const product of products) {
      orderItemsToCreate.push({
        productId: product._id,
        orderId: order.id,
        quantity: product.quantity,
      });
    }

    await tx.orderItem.createMany({
      data: orderItemsToCreate,
    });

    return order;
  });
}
