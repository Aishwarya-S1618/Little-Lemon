import './App.css';
import Footer from './components/Footer';
import Nav from './components/Nav';
import Main from './components/Main';
import BookingPage from './components/BookingPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState, useReducer, useEffect } from 'react';

export const initializeTimes = async () => {
  const today = new Date().toISOString().split("T")[0];
  const initialTimes = await window.fetchAPI(today);  // Fetch available times for today
  return { availableTimes: initialTimes };
};

export const timeReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_TIMES':
      return { availableTimes: action.payload };
    default:
      return state;
  }
};

const App = () => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests1: '',
    guests2: '',
    occasion: '',
  });

  const [availableTimes, dispatch] = useReducer(timeReducer, [], initializeTimes);

  // Update available times whenever the selected date changes
  const updateTimes = async (date) => {
    const times = await window.fetchAPI(date);  // Fetch available times for the selected date
    dispatch({ type: 'UPDATE_TIMES', payload: times });
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
