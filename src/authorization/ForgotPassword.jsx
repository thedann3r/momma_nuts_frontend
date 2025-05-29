import React, { useState } from 'react';

const url = "http://127.0.0.1:5000";

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
        const res = await fetch(`${url}/forgot-password`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        const data = await res.json();

        if (!res.ok) {
            setError(data.error || "Something went wrong");
            setMessage('');
        } else {
            setMessage(data.message);
            setError('');
        }
    } catch (err) {
        setError("Server error");
    } finally {
        setLoading(false); // End loading
    }
};

    return (
        <div className="signupContainer">
            <div className="signupCard">
                <h2>Forgot Password</h2>
                <form onSubmit={handleSubmit} className="signupForm">
                    <input
                        className="signupInput"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button className="signupButton" type="submit" disabled={loading}>
                        {loading ? "Sending..." : "Send Reset Link"}
                    </button>
                </form>
                {message && <p className="text-green-600">{message}</p>}
                {error && <p className="text-red-600">{error}</p>}
            </div>
        </div>
    );
}

export default ForgotPassword;
