import './App.css';
import './api.js';
import Footer from './components/Footer';
import Nav from './components/Nav';
import Main from './components/Main';
import BookingPage from './components/BookingPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState, useReducer, useEffect } from 'react';

// Helper function to wait until window.fetchAPI is available
const waitForFetchAPI = () => {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      if (typeof window.fetchAPI === 'function') {
        clearInterval(interval);
        resolve(window.fetchAPI);
      }
    }, 100);  // Check every 100ms
  });
};

export const initializeTimes = async () => {
  try {
    const today = new Date();  // Use Date object directly
    const fetchAPI = await waitForFetchAPI(); // Wait until fetchAPI is available
    const initialTimes = await fetchAPI(today); // Pass Date object to fetchAPI
    return { availableTimes: initialTimes };
  } catch (error) {
    console.error('Error fetching initial times:', error);
    return { availableTimes: [] };
  }
};



export const timeReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_TIMES':
      return { availableTimes: action.payload };
    default:
      return state;
  }
};
setTimeout(() => {
  console.log('fetchAPI:', window.fetchAPI); // Check if it's defined after a short delay
}, 1000);

const App = () => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests1: '',
    guests2: '',
    occasion: '',
  });

  const [availableTimes, dispatch] = useReducer(timeReducer, [], initializeTimes);

  const updateTimes = async (date) => {
    try {
      const fetchAPI = await waitForFetchAPI();
      const times = await fetchAPI(new Date(date)); // Convert to Date object if needed
      dispatch({ type: 'UPDATE_TIMES', payload: times });
    } catch (error) {
      console.error('Error in update times:', error);
    }
  };


  const handleFormChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

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
                availableTimes={availableTimes.availableTimes}
                updateTimes={updateTimes}
                formData={formData}
                onFormChange={handleFormChange}
              />
            }
          />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
