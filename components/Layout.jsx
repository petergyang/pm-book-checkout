// Wrapper for all pages on site

import Head from "next/head";
import styled from "@emotion/styled";
import GlobalStyles from "./prebuilt/GlobalStyles";

<<<<<<< Updated upstream
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Learning
// To best leverage Stripe’s advanced fraud functionality,
// include this script on every page, not just the checkout page.
// This allows Stripe to detect anomalous behavior that may be indicative
// of fraud as customers browse your website.
// Note: This is why we are adding it to a Layout component.

const stripePromise = loadStripe(process.env.PUBLISHABLE_KEY);

// TIP
// call loadStripe outside of a component
// in that way there's no chance it will get
// called more times than it needs to

=======
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// Call loadStripe with the publishable key to configure Stripe library
// IMPORTANT: Update with your own test publishable key
const stripePromise = loadStripe("pk_test_4ThyPqunJchndWwDmKvSoBVU00drfINyTE");

// Pass promise from loadStripe to Elements provider 
// so all child components can access Stripe service
>>>>>>> Stashed changes
const Layout = ({ children, title }) => {
  return (
    <>
      <GlobalStyles />
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
<<<<<<< Updated upstream
      <Elements stripe={stripePromise}>{children}</Elements>
=======
      <Elements stripe={stripePromise}>
        {children}
      </Elements>
>>>>>>> Stashed changes
    </>
  );
};

export default Layout;
