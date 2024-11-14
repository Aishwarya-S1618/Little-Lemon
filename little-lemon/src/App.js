import './App.css';
import './api.js';
import Footer from './components/Footer';
import Nav from './components/Nav';
import Main from './components/Main';
import BookingData from './components/BookingData.js';
import BookingPage from './components/BookingPage';
import BookingConfirmation from './components/BookingConfirmation';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState, useReducer, useEffect } from 'react';

// // Helper function to wait until window.fetchAPI is available
// const waitForFetchAPI = () => {
//   return new Promise((resolve) => {
//     const interval = setInterval(() => {
//       if (typeof window.fetchAPI === 'function') {
//         clearInterval(interval);
//         resolve(window.fetchAPI);
//       }
//     }, 100);  // Check every 100ms
//   });
// };

const initializeTimes = () => {
  const today = new Date();
  return window.fetchAPI(today);  // Fetch available times for today's date
};

const timeReducer = (state, action) => {
  if (action.type === 'UPDATE_TIMES') {
    const selectedDate = new Date(action.payload);
    return window.fetchAPI(selectedDate);  // Fetch times for selected date
  }
  return state;  // Return current state if no matching action type
};

const App = () => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests1: '',
    guests2: '',
    occasion: '',
  });
  const [bookingData, setBookingData] = useState(() => {
    const savedData = localStorage.getItem('bookingData');
    return savedData ? JSON.parse(savedData) : [];
  });

  // Store updated bookingData in localStorage
  useEffect(() => {
    localStorage.setItem('bookingData', JSON.stringify(bookingData));
  }, [bookingData]);

  const [availableTimes, dispatch] = useReducer(timeReducer, [], initializeTimes);
  const handleFormChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  const liftUpBookingData =(data)=>{
    setBookingData([...bookingData, data]);
  }
  // console.log("in App ", formData, "Data",bookingData);
  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/booking"
            element={
              <BookingPage
                availableTimes={availableTimes}
                formData={formData}
                onFormChange={handleFormChange}
                liftUpBookingData={liftUpBookingData}
              />
            }
          />
          <Route
            path="/booking-data"
            element={
              <BookingData
                bookingData={bookingData}
              />
            }
          />
          <Route path="/confirmation" element={<BookingConfirmation />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
