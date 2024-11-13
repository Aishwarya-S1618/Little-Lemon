import BookingForm from './BookingForm';
import React, { useState, useEffect } from 'react';

// Helper function to wait for fetchAPI to be available
const waitForFetchAPI = () => {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      if (typeof window.fetchAPI === 'function') {
        clearInterval(interval);
        resolve(window.fetchAPI);
      }
    }, 100); // Check every 100ms
  });
};
const BookingPage = () => {
  const [availableTimes, setAvailableTimes] = useState([
    // '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'
  ]);

  // Ensure formData is always initialized
  const [formData, setFormData] = useState({
    date: '', // Start with an empty string, or a default date
    time: '',
    guests1: '',
    guests2: '',
    occasion: '',
  });

  const handleFormChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  useEffect(() => {
    const fetchAvailableTimes = async () => {
      try {
        const fetchAPI = await waitForFetchAPI(); // Ensure fetchAPI is ready
        const today = new Date();  // Use current date
        const times = await fetchAPI(today);  // Fetch available times for today
        setAvailableTimes(times);  // Update availableTimes state
      } catch (error) {
        console.error('Error fetching available times:', error);
        setAvailableTimes([]);  // Handle any errors gracefully
      }
    };

    fetchAvailableTimes();  // Fetch the data when the component mounts
  }, []);  // Empty dependency array means this runs only once when the component mounts


  return (
    <div className="booking-page">
      <span className="typefaces">Reserve a Table</span>
      <BookingForm
        availableTimes={availableTimes}
        formData={formData}
        onFormChange={handleFormChange}
      />
    </div>
  );
};

export default BookingPage;
