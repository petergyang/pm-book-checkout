import Stripe from "stripe";

const stripe = new Stripe(process.env.SECRET_KEY);
const express = require('express');
const app = express();
const { resolve } = require("path");

// For webhook handler and saving successful payment ids to a file (payments.log)
const bodyParser = require('body-parser');
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const winston = require('winston'); // Library for saving events to file
const logConfiguration = {
  'transports': [
    new winston.transports.File({
      filename: 'payments.log'
    })
  ]
};
const logger = winston.createLogger(logConfiguration); 

// Add endpoint to create PaymentIntent, which tracks customer's payment lifecycle.
// Returns a client secret that the client can use to finish the payment.
// Returns an error message if the card was not accepted.
export default async (req, res) => {
  try {
    const { amount } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      metadata: {integration_check: 'accept_a_payment'}, // For validating test cases in doc
    });

    res.status(200).send(paymentIntent.client_secret);

  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

// Use JSON parser for all non-webhook routes
app.use((req, res, next) => {
  if (req.originalUrl === '/webhook') {
    next();
  } else {
    bodyParser.json()(req, res, next);
  }
});

// Webhook handler for listening to payment_intent.succeeded events
// If payment_intent.succeeded, saves paymentIntent.id to payments.log file
app.post('/webhook', bodyParser.raw({type: 'application/json'}), (request, response) => {
  console.log('Entering webhook!');
  let event;

  try {
    event = JSON.parse(request.body);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('PaymentIntent succeeded!');
      console.log(paymentIntent.id);
      logger.info(paymentIntent.id);
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      console.log('PaymentMethod was attached to a Customer!');
      break;
    default:
      // Unexpected event type
      return response.status(400).end();
  }

  // Return a 200 response to acknowledge receipt of the event
  response.json({received: true});
});

app.listen(4242, () => console.log('Running on port 4242'));

