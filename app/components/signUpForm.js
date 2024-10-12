'use client';
import React, { useState } from 'react';
import axios from 'axios';

const SignupForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/signup`, { username, password });
            if (response.status === 201) {
                alert('User registered successfully. Please log in.');
                setUsername('');
                setPassword('');
            }
        } catch (error) {
            console.error('Error signing up:', error);
            setErrorMessage('Failed to register. Please try again.');
        }
    };

    return (
        <div className="signup-form-container">
            <h3>Sign Up</h3>
            <form onSubmit={handleSignup}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Sign Up</button>
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    );
};

export default SignupForm;
