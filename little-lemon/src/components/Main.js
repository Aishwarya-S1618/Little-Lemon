import React from 'react';
import Hero from './Hero';
import Specials from './Specials';
import CustomersSay from './CustomersSay';
import About from './About';

// The Main content of the Home page
const Main = () => {

  return (
    <>
      <Hero />
      <Specials />
      <CustomersSay />
      <About />
    </>
  );
};

export default Main;