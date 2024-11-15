import React from "react";
import MnA1 from "../images/MandA-A.jpg";
import MnA2 from "../images/MandA-B.jpg";
const About = () => {
  return (
    <section className="about-container" aria-labelledby="about-heading">
      <header className="about-text">
        <h1  id="about-heading" className="typefaces">Little Lemon</h1>
        <h2 className="subtitle">Chicago</h2>
        <p>
          We are a family-owned Mediterranean restaurant, focused on traditional
          recipes served with a modern twist.
        </p>
      </header>
      <aside className="about-images">
      <div className="about-images-wrapper">
        <img src={MnA1} alt="Mario and Atlee" className="image am1" />
        <img src={MnA2} alt="Founders" className="image am2" />
      </div>
      </aside>
    </section>
  );
};

export default About;
