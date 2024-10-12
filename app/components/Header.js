'use client';
import React from 'react';
import Image from 'next/image'; // Assuming you're using next/image for profile pictures

const Header = () => {
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

            {/* User Profile */}
            <div className="profile-container d-flex align-items-center">
                <div className="profile-picture" style={{ marginRight: '10px' }}>
                    <Image
                        src="/profile.jpg" // Ensure the profile.jpg is inside the public folder
                        alt="User Profile"
                        width={50}
                        height={50}
                        className="rounded-circle"
                    />
                </div>
            </div>
        </header>
    );
};

export default Header;
