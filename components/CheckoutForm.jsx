import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import axios from "axios"; // Make easy fetch requests

import Row from "./prebuilt/Row";
import BillingDetailsFields from "./prebuilt/BillingDetailsFields";
import SubmitButton from "./prebuilt/SubmitButton";
import CheckoutError from "./prebuilt/CheckoutError";

import { 
  CardElement, 
  useStripe, 
  useElements }
  from '@stripe/react-stripe-js';

const CardElementContainer = styled.div`
  height: 40px;
  display: flex;
  align-items: center;

  & .StripeElement {
    width: 100%;
    padding: 15px;
  }
`;

const CheckoutForm = ({ price, onSuccessfulCheckout }) => {
  const [isProcessing, setProcessingTo] = useState(false);
  const [checkoutError, setCheckoutError] = useState();

  // Gets Stripe and Elements objects from Stripe JS
  const stripe = useStripe();
  const elements = useElements(); 

  // Handle payment details input errors
  const handleCardDetailsChange = ev => {
    ev.error ? setCheckoutError(ev.error.message): setCheckoutError();
  };

  const handleFormSubmit = async ev => {
    ev.preventDefault();

    const billingDetails = {
      name: ev.target.name.value,
      email: ev.target.email.value, 
      address: {
        city: ev.target.city.value,
        line1: ev.target.address.value,
        state: ev.target.state.value,
        postal_code: ev.target.zip.value
      }
    };
    
    // Disables the submit button when the payment is processing
    setProcessingTo(true); 

    const cardElement = elements.getElement(CardElement);

    // Fetch a new PaymentIntent object from the endpoint
    // Displays errors if fetch or confirm card payment function fails
    try {
      const { data: clientSecret } = await axios.post("/api/payment_intents", {
        amount: price * 100 // Price to charge user
      });

      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: billingDetails
        }
      });

      if (error) {
        setCheckoutError(error.message);
        setProcessingTo(false);
        return;
      }

      onSuccessfulCheckout();
    } catch (err) {
      setCheckoutError(err.message);
    }
  };

  // Styles the card input field
  const cardStyle = {
    style: {
      base: {
        fontSize: '16px',
        color: '#fff',
        "::placeholder": {
          color: '#87bbfd'
        }
      },
      invalid: {
        color: '#FFC7EE',
        iconColor: '#FFC7EE'
      },
    },
    hidePostalCode: true,
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <Row>
        <BillingDetailsFields />
      </Row>
      <Row>
        <CardElementContainer>
          <CardElement options={cardStyle}/>
        </CardElementContainer>
      </Row>
      {checkoutError && <CheckoutError>{checkoutError}</CheckoutError>}
      <Row>
        {/* TIP always disable your submit button while processing payments */}
        <SubmitButton disabled={isProcessing || !stripe}>
          {isProcessing ? "Processing..." : `Pay $${price}`}
        </SubmitButton>
      </Row>
    </form>
  );
};

export default CheckoutForm;