import React, { useState } from 'react';

const CreateAccount = () => {
    const [email, setEmail] = useState('');
    const [link, setLink] = useState('this is dummy link');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting to backend");

        try {
            const response = await fetch('http://localhost:4242/acc_creation_and_acc_link', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    emailID: email,
                }),
            });

            const data = await response.json();
            console.log("Response:", data.account_link);
            setLink(data.account_link);
            // You could display a message or handle data here

        } catch (error) {
            console.error("Error sending email:", error);
        }
    };

    return (
        <div>
            <span>Create Account</span>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Type your email id here"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Send</button>
            </form>
            <span>Below will be the link for the verification</span>
            <br />
            <span>{link}</span>
        </div>
    );
};

export default CreateAccount;
