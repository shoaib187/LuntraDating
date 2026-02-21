import Stripe from 'stripe';

export async function POST(req) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  try {
    const { amount, customerEmail } = await req.json();

    // 1. Create (or find) a Customer in Stripe
    const customer = await stripe.customers.create({ email: customerEmail });

    // 2. Create an Ephemeral Key (allows the mobile app to manage the customer)
    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: '2023-10-16' }
    );

    // 3. Create the Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Amount in cents ($10 = 1000)
      currency: 'usd',
      customer: customer.id,
      automatic_payment_methods: { enabled: true },
    });

    return Response.json({
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
    });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}