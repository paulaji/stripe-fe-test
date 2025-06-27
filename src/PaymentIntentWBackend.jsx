import {
    useStripe, useElements, CardElement,
} from '@stripe/react-stripe-js'

const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            color: '#32325d',
            fontFamily: 'Arial, sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            '::placeholder': {
                color: '#aab7c4',
            },
        },
        invalid: {
            color: '#fa755a',
            iconColor: '#fa755a',
        },
    },
}

const PaymentIntentWBackend = ({ clientSecret }) => {
    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const clientSecretFetch = await fetch('https://991c-2a09-bac5-3a67-20a-00-34-bb.ngrok-free.app/card_w_payment_intent');
        const clientSecretData = await clientSecretFetch.json();
        const clientSecret = await clientSecretData.client_secret;
        const paymentIntentID = await clientSecretData.payment_intent_id;
        const amountReceived = await clientSecretData.amount_received;

        alert(clientSecret);

        if (!stripe || !elements) return

        const cardElement = elements.getElement(CardElement)

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
                billing_details: {
                    name: 'Jenny Rosen',
                },
            },
        })

        if (result.error) {
            console.error('Payment failed:', result.error.message)
        } else {
            if (result.paymentIntent.status === 'succeeded') {
                console.log('Payment succeeded!')
            }
        }

        await fetch('https://991c-2a09-bac5-3a67-20a-00-34-bb.ngrok-free.app/capture_the_payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                payment_intent_id: paymentIntentID,
                payment_amount: amountReceived,
            }),
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '0 auto' }}>
                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '8px' }}>Card Details</label>
                    <div style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }}>
                        <CardElement options={CARD_ELEMENT_OPTIONS} />
                    </div>
                </div>
                <button type="submit" disabled={!stripe}
                    style={{
                        backgroundColor: '#5469d4',
                        color: '#ffffff',
                        fontSize: '16px',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '12px 16px',
                        width: '100%',
                        cursor: 'pointer',
                    }}>
                    Pay
                </button>
            </form>
        </div>
    )
}

export default PaymentIntentWBackend
