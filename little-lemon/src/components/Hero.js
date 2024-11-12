import HeroImage from '../images/restauranfood.jpg';
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
            <button className="reserve-button leadtext">Reserve a Table</button>
        </div>
        <div className='hero-image-container'>
        <img src={HeroImage} alt="Resturant Food" classname="hero-image"/>
        </div>
    </main>

    </>
    )}
export default Hero;