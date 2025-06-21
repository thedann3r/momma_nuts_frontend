import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import peanut from '../assets/peanutimage.png'

const url = "http://127.0.0.1:5000";

function SignupForm() {
    const [token, setToken] = useState(localStorage.getItem('access_token'));
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    const handleSignup = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const password = formData.get('password');
        const confirmPassword = formData.get('confirm_password');
        const email = formData.get('email');
        const phone = formData.get('phone');

        // ✅ Check if passwords match before sending request
        if (password !== confirmPassword) {
            alert("Passwords do not match! Please try again.");
            return;
        }

        // ✅ Password strength check (add your own validation logic)
        if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
            alert("Password must be at least 8 characters long and contain both letters and numbers.");
            return;
        }

        // ✅ Ensure both email and phone are provided
        if (!email || !phone) {
            alert("Please provide both an email and a phone number.");
            return;
        }

        fetch(`${url}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: formData.get('name'),
                email: email,
                phone: phone,
                password: password,
                confirm_password: confirmPassword, // Send confirm_password for backend validation
            }),
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                return response.json().then((data) => {
                    alert(data.error || 'Error signing up');
                    throw new Error('Error signing up');
                });
            }
        })
        .then((data) => {
            setToken(data.create_token);
            setUser({ name: data.user.name, role: data.user.role });
            localStorage.setItem("access_token", data.create_token);

            alert(`Welcome ${data.user.name}, your account has been created successfully.`);
        })
        .catch((error) => {
            console.error("Signup error:", error);
        });
    };

    if (token) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="signupContainer">
            <div className="signupCard">
                <div className="signupLeft">
                    <div className="signupImagePlaceholder">
                        {/* <img src="https://cdn.create.vista.com/api/media/small/426382906/stock-photo-hostel-dormitory-beds-arranged-in-room" alt="signup" /> */}
                        <img src={peanut} alt="momma nut" />
                    </div>
                </div>
                <div className="signupRight">
                    <form className="signupForm" onSubmit={handleSignup}>

                    <h2>Create an Account</h2>

                        <input className="signupInput" type="text" name="name" placeholder="Enter name..." required />
                        <input className="signupInput" type="email" name="email" placeholder="Enter email..." required />
                        <input className="signupInput" type="text" name="phone" placeholder="Enter phone number..." required />
                        <input className="signupInput" type="password" name="password" placeholder="Enter password..." required />
                        <input className="signupInput" type="password" name="confirm_password" placeholder="Confirm password..." required />
                        <button className="signupButton" type="submit">Sign Up</button>

                    <p className="signupFooter">Already have an account? <a href="/login">Log in</a></p>
                    </form>
                </div>
            </div>
        </div> 
    );
}

export default SignupForm;
