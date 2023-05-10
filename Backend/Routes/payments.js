import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();

const paymentRoute = express.Router();
// const stripePublishableKey = process.env.STRIPE_PUBLISHABLE_KEY || '';
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || '';

paymentRoute.post('/payment-sheet', async (req, res) => {
  console.log('====================================');
  console.log(typeof req.body.amount);
  console.log('====================================');
  const {email = `test${Math.floor(Math.random() * 9999) + 1}@domain.com`} =
    req.body;

  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: '2020-08-27',
    typescript: true,
  });

  const customer = await stripe.customers.create({email});

  const ephemeralKey = await stripe.ephemeralKeys.create(
    {customer: customer.id},
    {apiVersion: '2020-08-27'},
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: 'usd',
    payment_method_types: ['card', 'link', 'us_bank_account'],
  });
  return res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
  });
});

export {paymentRoute};
