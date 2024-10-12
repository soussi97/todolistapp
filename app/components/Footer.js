'use client';
import React from 'react';
import { FaFacebook, FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';
import Image from 'next/image';

const Footer = () => {
    return (
        <footer className="footer d-flex align-items-center justify-content-between">
            {/* Logo and App Title */}
            <div className="footer-logo-container d-flex align-items-center">
                <Image
                    src="/logo.png" // Replace with your logo path
                    alt="Logo"
                    width={50}
                    height={50}
                    className="rounded-circle footer-logo"
                />
                <span className="footer-app-title">Todo List</span>
            </div>
            
            {/* Copyright Text */}
            <p className="footer-text">© 2024 Tekandme. All Rights Reserved.</p>
            
            {/* Social Icons */}
            <div className="social-icons d-flex align-items-center">
                <a href="#facebook" className="social-link">
                    <FaFacebook size={20} />
                </a>
                <a href="#linkedin" className="social-link">
                    <FaLinkedin size={20} />
                </a>
                <a href="#twitter" className="social-link">
                    <FaTwitter size={20} />
                </a>
                <a href="#github" className="social-link">
                    <FaGithub size={20} />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
