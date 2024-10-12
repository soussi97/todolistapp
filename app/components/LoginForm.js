'use client';
import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        console.log('Attempting login with email:', email);

        try {
            if (!email || !password) {
                setErrorMessage('Email and password are required.');
                setLoading(false);
                console.log('Validation failed: Email or password missing.');
                return;
            }

            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`, { email, password });
            console.log('Server response:', response);

            if (response.status === 200) {
                const { token } = response.data;
                console.log('Login successful. Token:', token);
                localStorage.setItem('authToken', token);
                onLogin(token);
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setErrorMessage('Invalid credentials. Please try again.');
        }

        setLoading(false);
    };

    return (
        <div className="login-form-container">
            <h3>Log In</h3>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Log In'}
                </button>
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    );
};

export default LoginForm;
