import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js';
import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY_CHECKOUT);

const StripeCheckout = () => {

    const [stripeCheckoutUI, setStripeCheckoutUI] = useState(false);
    const [amount, setAmount] = useState(0);

    const fetchClientSecret = () => {
        // Create a Checkout Session
        setStripeCheckoutUI(true);
        // return fetch("http://localhost:4242/create-checkout-session",
        return fetch("http://localhost:4242/card_w_payment_intent",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    amount: amount,
                }),
            })
            .then((res) => res.json())
            .then((data) => data.clientSecret);
    };

    const handleAmountChange = (e) => {
        const value = e.target.value;

        if (/^\d*$/.test(value)) {
            setAmount(Number(value));
        }
    };

    const options = { fetchClientSecret };
    return (
        <div>
            <label>Enter Amount in Cents</label>
            <input
                type="text"
                value={amount}
                onChange={handleAmountChange}
                placeholder="Enter a number"
            />
            <button onClick={fetchClientSecret}>Amount sent will be {amount / 100} Eur</button>
            {stripeCheckoutUI && (
                <div id="checkout">
                    <EmbeddedCheckoutProvider
                        stripe={stripePromise}
                        options={options}
                    >
                        <EmbeddedCheckout />
                    </EmbeddedCheckoutProvider>
                </div>
            )}
        </div>
    )
}

export default StripeCheckout