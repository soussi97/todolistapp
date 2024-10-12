'use client';
import React from 'react';
import { FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer">
            <p>© 2024 Tekandme. All Rights Reserved.</p>
            <div className="social-icons d-flex justify-content-center mt-2">
                <a href="#facebook" className="mx-3 social-link">
                    <FaFacebook size={20} />
                </a>
                <a href="#linkedin" className="mx-3 social-link">
                    <FaLinkedin size={20} />
                </a>
                <a href="#twitter" className="mx-3 social-link">
                    <FaTwitter size={20} />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
