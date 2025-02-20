// src/components/Navbar/Navbar.jsx
import React, { useState } from 'react';
import './Navbar.css';
import search from '../../assets/search.png';
import logoIpsum from '../../assets/logoipsum-332.svg';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav>
            <div className='flexBar'>
                <div className='navLeft'>
                    <div className="logo">
                        <img src={logoIpsum} alt="logo" />
                    </div>
                    <div className='searchBox'>
                        <input type="text" placeholder='Find Minority Businesses' />
                        <img src={search} alt="search" />
                    </div>
                </div>

                <div className='navRight'>
                    <div className='navItems'> {/* These are hidden on mobile */}
                        <div className='navItem'>
                            <p>Businesses</p>
                        </div>
                        <div className='navItem'>
                            <p>Community</p>
                        </div>
                        <div className='navItem'>
                            <p>Resources</p>
                        </div>
                        <div className='navItem'>
                            <Link to="/reviews">Reviews</Link>
                        </div>
                    </div>

                    <div className='navEnd'> {/* These are hidden on mobile */}
                        <div className='signIn loginBox'>
                            <p> Sign In </p>
                        </div>
                        <div className='Register loginBox'>
                            <p> Register </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Button (Hamburger Icon) */}
            <button className="mobile-menu-button" onClick={toggleMobileMenu}>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            </button>

            {/* Mobile Menu (Dropdown) */}
            <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
                <div className="mobile-menu-item" onClick={toggleMobileMenu}> {/* Close menu on click */}
                    <p>Businesses</p>
                </div>
                <div className="mobile-menu-item" onClick={toggleMobileMenu}> {/* Close menu on click */}
                    <p>Community</p>
                </div>
                <div className="mobile-menu-item" onClick={toggleMobileMenu}> {/* Close menu on click */}
                    <p>Resources</p>
                </div>
                <div className="mobile-menu-item" onClick={toggleMobileMenu}> {/* Close menu on click */}
                    <Link to="/reviews" onClick={toggleMobileMenu}>Reviews</Link> {/* Close menu on click */}
                </div>
                <div className="mobile-menu-item signIn loginBox" onClick={toggleMobileMenu}> {/* Close menu on click */}
                    <p> Sign In </p>
                </div>
                <div className="mobile-menu-item Register loginBox" onClick={toggleMobileMenu}> {/* Close menu on click */}
                    <p> Register </p>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;