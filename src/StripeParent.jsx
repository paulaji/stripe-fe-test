// StripeCheckoutTest.jsx
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import StripeElement from './StripeElement';
import PaymentIntentWBackend from './PaymentIntentWBackend';

// The account id provided is paul@take1's

// Magenta Spinner or Live, change API key here
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY_REAL)


const StripeParent = () => {
    return (
        <Elements stripe={stripePromise}>
            {/* paulx123@gmail.com */}
            {/* <StripeElement accountId="acct_1RanuC4NAzCZELdy" /> */}
            <PaymentIntentWBackend />
        </Elements>
    );
};

export default StripeParent;
