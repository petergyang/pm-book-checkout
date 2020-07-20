// Wrapper for all pages on site

import Head from "next/head";
import styled from "@emotion/styled";
import GlobalStyles from "./prebuilt/GlobalStyles";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// Call loadStripe with the publishable key to configure Stripe library
// IMPORTANT: Update with your own test publishable key
const stripePromise = loadStripe("pk_test_4ThyPqunJchndWwDmKvSoBVU00drfINyTE");

// Pass promise from loadStripe to Elements provider 
// so all child components can access Stripe service
const Layout = ({ children, title }) => {
  return (
    <>
      <GlobalStyles />
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Elements stripe={stripePromise}>
        {children}
      </Elements>
    </>
  );
};

export default Layout;
