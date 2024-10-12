'use client';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Header = ({ onLogout }) => {
    const router = useRouter();

    // Handle logout action
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        if (onLogout) {
            onLogout();
        }
        router.push('/'); // Redirect to login page after logout
    };

    return (
        <header 
            className="header d-flex align-items-center justify-content-between p-3" 
            style={{ backgroundColor: '#F5E1DC' }}
        >
            {/* Logo and App Title */}
            <div className="d-flex align-items-center">
                <div className="logo-container" style={{ marginRight: '15px' }}>
                    <Image
                        src="/logo.png"  // Ensure the logo.png is inside the public folder
                        alt="Logo"
                        width={50}
                        height={50}
                        className="rounded-circle"
                    />
                </div>
                <h2 className="app-title fw-bold" style={{ fontFamily: 'cursive', fontSize: '2rem' }}>
                    Todo List
                </h2>
            </div>

            {/* User Profile and Logout */}
            <div className="profile-container d-flex align-items-center">
                <a href="/profile" className="profile-picture" style={{ marginRight: '10px' }}>
                    <Image
                        src="/profile.jpg" // Ensure the profile.jpg is inside the public folder
                        alt="User Profile"
                        width={50}
                        height={50}
                        className="rounded-circle"
                    />
                </a>
                <button 
                    className="btn btn-outline-secondary ms-3" 
                    onClick={handleLogout}
                    style={{ padding: '0.5rem 1rem', borderRadius: '10px' }}
                >
                    Logout
                </button>
            </div>
        </header>
    );
};

export default Header;