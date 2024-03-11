"use server";
import Stripe from "stripe";
import { db } from "../db";
import { stripe } from ".";

export const subscriptionCreated = async (
  subscription: Stripe.Subscription,
  customerId: string
) => {
  try {
    const agency = await db.agency.findFirst({
      where: {
        customerId,
      },
      include: {
        Subscription: true,
      },
    });
    if (!agency) {
      throw new Error("Could not find an agency for subscription");
    }
    const data = {
      active: subscription.status === "active",
      agencyId: agency.id,
      customerId: customerId,
      currentPeriodEndDate: new Date(subscription.current_period_end * 1000),
      //@ts-ignore
      priceId: subscription.plan.id,
      subscriptionId: subscription.id,
      //@ts-ignore
      plan: subscription.plan.id,
    };

    const res = await db.subscription.upsert({
      where: {
        agencyId: agency.id,
      },
      create: data,
      update: data,
    });
    console.log(`Created Subscription for ${subscription.id}`);
  } catch (error) {
    console.log(`Error while creating Subscription`);
  }
};

export const getConnectedAccountProducts = async (stripeAccount: string) => {
  const products = await stripe.products.list(
    {
      limit: 500,
      expand: ["data.default_price"],
    },
    {
      stripeAccount,
    }
  );

  return products.data;
};
