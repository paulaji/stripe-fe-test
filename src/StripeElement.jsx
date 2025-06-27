// StripeElement.jsx
import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const StripeElement = ({ accountId }) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            console.error('Stripe.js has not loaded yet.');
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const { error: methodError, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (methodError) {
            console.error(methodError.message);
            return;
        }

        const res = await fetch('http://localhost:4242/card_w_payment_intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                payment_method: paymentMethod.id,
                connected_account_id: accountId,
            }),
        });

        const data = await res.json();

        if (data.error) {
            console.error('Backend error:', data.error);
            return;
        }

        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(data.client_secret);

        if (confirmError) {
            console.error('Confirmation error:', confirmError.message);
        } else if (paymentIntent.status === 'succeeded') {
            console.log('💰 Payment succeeded!');
        } else {
            console.log('⚠️ Payment status:', paymentIntent.status);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Pay with Card</h3>
            <CardElement />
            <button type="submit" disabled={!stripe}>Pay</button>
        </form>
    );
};

export default StripeElement;
