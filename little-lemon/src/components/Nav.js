import Logo from '../images/Logo.svg';
import React from 'react';

const Nav = () => {
  const links = [
    { href: '#home', text: 'Home' },
    { href: '#about', text: 'About' },
    { href: '#services', text: 'Services' },
    { href: '#contact', text: 'Contact' },
  ];

  return (
    <nav>
      <img src={Logo} alt="Logo"/>
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            <a href={link.href}>{link.text}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;