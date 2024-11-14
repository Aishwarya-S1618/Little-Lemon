import HeroImage from '../images/restauranfood.jpg';
import { Link } from 'react-router-dom';
const Hero =() =>{
    return(
    <>
    <main className="little-lemon-container">
        <div className="content">
            <h1 className="title typefaces">Little Lemon</h1>
            <h3 className="location subtitle">Chicago</h3>
            <p className="description paragraphtext">
            We are a family-owned Mediterranean restaurant, focused on traditional
            recipes served with a modern twist.
            </p>
            <Link to ='./booking'>
            <button className="reserve-button leadtext">Reserve a Table</button>
            </Link>
        </div>
        <div className='hero-image-container'>
        <img src={HeroImage} alt="Resturant Food" className="hero-image"/>
        </div>
    </main>

    </>
    )}
export default Hero;