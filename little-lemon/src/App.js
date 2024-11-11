import './App.css';
import Footer  from './components/Footer';
import Nav  from './components/Nav';
import Main  from './components/Main';
import BookingPage from './components/BookingPage'; // Import the BookingPage component
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
    <Router>
    <Nav/>
    <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/booking" element={<BookingPage />} /> {/* Add a route for BookingPage */}
      </Routes>
    <Footer/>
    </Router>
    </>
  );
}

export default App;
