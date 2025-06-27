const
    StripeTest = () => {

        const paymentIntentAPICall = async () => {
            const response = await fetch("http://localhost:4242/payment_intent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    amount: 500,
                    currency: "eur",
                }),
            });

            const data = await response.json();
            console.log("Server response:", data);
        }

        return (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span>
                    StripeTest
                </span>
                <hr />
                <button onClick={paymentIntentAPICall}>Payment Intent, Customer, Virtual Wallet - preset amount is 500 and currency is euro</button>
            </div>
        )
    }

export default
    StripeTest