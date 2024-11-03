// Footer.js
import React from 'react';
import Logo from '../images/Logo2.png';

/**
 * Footer component containing company information and links
 * @component
 */
const Footer = () => {
  // Footer content configuration
  const footerSections = [
    {
      id: 'navigation',
      title: 'Doormat Navigation',
      items: [
        { text: 'Home', href: '#home' },
        { text: 'About', href: '#about' },
        { text: 'Menu', href: '#menu' },
        { text: 'Reservations', href: '#reservations' },
        { text: 'Order Online', href: '#orderonline' },
        { text: 'Login', href: '#login' },
      ],
    },
    {
      id: 'contact',
      title: 'Contact',
      items: [
        { text: '123 Little Lemon St, Chicago', href: null },
        { text: '(555) 123-4567', href: 'tel:+15551234567' },
        { text: 'contact@littlelemon.com', href: 'mailto:contact@littlelemon.com' },
      ],
    },
    {
      id: 'social',
      title: 'Social Media Links',
      items: [
        { text: 'Facebook', href: 'https://facebook.com/littlelemon' },
        { text: 'Instagram', href: 'https://instagram.com/littlelemon' },
        { text: 'Twitter', href: 'https://twitter.com/littlelemon' },
      ],
    },
  ];

  /**
   * Handle smooth scrolling for footer navigation
   * @param {string} href - Target section ID
   * @param {Event} e - Click event
   */
  const handleFooterNavClick = (href, e) => {
    if (href?.startsWith('#')) {
      e.preventDefault();
      const element = document.getElementById(href.substring(1));
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
  };

  /**
   * Render a footer section
   * @param {Object} section - Section configuration object
   */
  const renderFooterSection = ({ id, title, items }) => (
    <div key={id} className="footer-section">
      <h3>{title}</h3>
      <ul>
        {items.map((item, index) => (
          <li key={`${id}-${index}`}>
            {item.href ? (
              <a
                href={item.href}
                onClick={(e) => handleFooterNavClick(item.href, e)}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {item.text}
              </a>
            ) : (
              item.text
            )}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer className="footer" id="about">
      <div className="footer-logo">
        <img src={Logo} alt="Little Lemon Logo" />
      </div>
      <div className="footer-links">
        {footerSections.map(renderFooterSection)}
      </div>
    </footer>
  );
};


export default Footer;