import Stripe from "stripe";

import connectDB from "@/backend/lib/db/db";

import User from "@/backend/models/users.model";
import Plan from "@/backend/models/plan.model";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  await connectDB();

  const body = await req.text();

  const signature = req.headers.get("stripe-signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // PAYMENT SUCCESS
  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;

    const userId = paymentIntent.metadata.userId;

    const planId = paymentIntent.metadata.planId;

    // Find user & plan
    const user = await User.findById(userId);

    const plan = await Plan.findById(planId);

    if (user && plan) {
      const startDate = new Date();

      const endDate = new Date();

      endDate.setDate(endDate.getDate() + plan.durationInDays);

      // Update subscription
      user.role = "premium";

      user.subscription = {
        planId: plan._id,
        startDate,
        endDate,
        isActive: true,
      };

      // Reset usage
      user.usage = {
        dailySwipes: 0,
        superLikesUsed: 0,
        profileBoostsUsed: 0,
      };

      await user.save();

      console.log("Subscription activated");
    }
  }

  return Response.json({
    received: true,
  });
}
