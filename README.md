## Accept payments for PM book with Stripe PaymentIntent API

Peter Yang

### Overview
This program accepts payments for my product management book using Stripe's PaymentIntent API. Below I've included instructions for installing the program, running through test cases, and saving successful payments to a file using a webhook.

### Getting Started
1. Make sure you have React and Node.js installed `https://nodejs.org/en/`
2. From terminal, clone the repo `git clone https://github.com/petergyang/pm-book-checkout.git`
3. From terminal, cd into folder `pm-book-checkout`
4. Install the dependencies `npm install`
5. Install ee-first `npm install ee-first` <-- Can't debug why this isn't included in step 4, but please install it
6. In your code editor: 
   - Update `.env` file with your Stripe test publishable and secret keys (get these from dashboard)
   - Go to `components/layout.jsx` file, update `const stripePromise` (line 12) with your Stripe test publishable key
7. Build the program `npm run build`
8. Run the program `npm start`
9. Go to `http://localhost:3000/` to see the program 

### Run through test cases
1. Run the program `npm start`
2. Visit `https://stripe.com/docs/payments/accept-a-payment` and scroll to `Test the integration` section
3. Copy and paste the test card numbers into the program and click `Pay $8.99` button one by one 
4. In doc, click `Check payments` button and confirm that all test cases passed

### Saving successful payment ids to payments.log file with webhook 
1. Set up Stripe CLI. Instructions: `https://stripe.com/docs/payments/handling-payment-events` 
2. Run the program `npm start` from `pm-book-checkout` folder
3. In a separate terminal, type `stripe listen --forward-to http://localhost:4242/webhook`
4. Go to `http://localhost:3000/` to see the program. Fill in the payment details using the test card number `4242 4242 4242 4242`. Click `Pay $8.99` button and confirm that the payment succeeded.
5. Open payments.log in code editor, confirm that a payment id is logged:
   e.g. `{"message":"pi_1H6lpiICRPF0djPHXWRZ0wmh","level":"info"}`

### About the project
The two main files that contain the PaymentIntent logic are:
1. `payment_intents.js`: Includes paymentIntent endpoint and webhook handler
2. `CheckoutForm.jsx`: Displays card input field, fetches paymentIntent, and confirms card payment.

### Resources used in this integration
1. Stripe Accept payments doc: `https://stripe.com/docs/payments/integration-builder`
2. Stripe Handling payment events doc: `https://stripe.com/docs/payments/handling-payment-events` 
3. Stripe React JS web tutorial: `https://www.youtube.com/watch?v=w1oLdAPyuok`