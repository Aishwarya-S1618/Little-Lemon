import HeroImage from '../images/restauranfood.jpg';
import { Link } from 'react-router-dom';
//Hero section - contains the reserve a table button to navigate to booking page
const Hero =() =>{
    return(
    <>
    <main className="little-lemon-container">
        <aside className="content">
            <h1 className="title typefaces">Little Lemon</h1>
            <h3 className="location subtitle">Chicago</h3>
            <p className="description paragraphtext">
            We are a family-owned Mediterranean restaurant, focused on traditional
            recipes served with a modern twist.
            </p>
            <Link to ='./booking'>
            <button className="reserve-button leadtext" aria-label="Reserve a table at Little Lemon">Reserve a Table</button>
            </Link>
        </aside>
        <aside className='hero-image-container'>
        <img src={HeroImage} alt="Resturant Food" className="hero-image"/>
        </aside>
    </main>

    </>
    )}
export default Hero;