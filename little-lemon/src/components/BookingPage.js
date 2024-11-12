import BookingForm from './BookingForm';
import React, { useState } from 'react';

const BookingPage = () => {
  const [availableTimes, setAvailableTimes] = useState([
    '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'
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
