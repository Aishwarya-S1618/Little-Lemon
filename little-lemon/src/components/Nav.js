import React, { useState, useEffect } from 'react';
import Logo from '../images/Logo.svg';
import { FaBars, FaTimes } from 'react-icons/fa'; // Make sure to install react-icons: npm install react-icons

/*
 * Navigation- menu bar component for the application.
 */
const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 550);

// Navigation configuration
  const links = [
    { href: '#home', text: 'Home' },
    { href: '#about', text: 'About' },
    { href: '#menu', text: 'Menu' },
    { href: '#reservations', text: 'Reservations' },
    { href: '#orderonline', text: 'Order Online' },
    { href: '#login', text: 'Login' },
  ];
/**
 * Handle window resize events
*/
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 550);
      if (window.innerWidth > 550) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="nav">
      <div className="nav-container">
        <div className="nav-logo">
          <img src={Logo} alt="Logo" />
        </div>

        {isMobileView ? (
          <>
            <button className="menu-toggle" onClick={toggleMenu}>
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
            {isMenuOpen && (
              <div className="mobile-menu">
                <ul className="mobile-nav-links">
                  {links.map((link, index) => (
                    <li key={index} className="mobile-nav-item">
                      <a
                        href={link.href}
                        className="mobile-nav-link"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        ) : (
          <ul className="nav-links">
            {links.map((link, index) => (
              <li key={index} className="nav-item">
                <a href={link.href} className="nav-link">
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Nav;