import React from 'react';
import Logo from '../images/Logo2.png';
import  {useNavigate} from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

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
        { text: '(555) 123-4567', href: null },
        { text: 'contact@littlelemon.com', href: null },
      ],
    },
    {
      id: 'social',
      title: 'Social Media Links',
      items: [
        { text: 'Facebook', href: 'https://facebook.com' },
        { text: 'Instagram', href: 'https://instagram.com' },
        { text: 'Twitter', href: 'https://twitter.com' },
      ],
    },
  ];

  // Footer click handler for navigating to sections
  const handleFooterNavClick = (href, e) => {
    if (href?.startsWith('#')) {
      e.preventDefault();
      if (window.location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(href.substring(1));
          if (element) {
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }
        }, 100); // Delay to ensure DOM is loaded after navigation
      } else {
        const element = document.getElementById(href.substring(1));
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }
    }
  };

  const renderFooterSection = ({ id, title, items }) => (
    <div key={id} className="footer-section">
      <h3 className="sectiontitle">{title}</h3>
      <ul>
        {items.map((item, index) => (
          <li className="paragraphtext" key={`${id}-${index}`}>
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
