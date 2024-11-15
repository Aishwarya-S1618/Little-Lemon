import React, { useState, useEffect } from 'react';
import { FaExclamationCircle } from 'react-icons/fa';
// Child Component of BookingPage renders the form
const BookingForm = ({ availableTimes, formData, onFormChange, onBookingSubmit }) => {
  const [filteredTimes, setFilteredTimes] = useState(availableTimes);
  const [errors, setErrors] = useState({
    date: '',
    time: '',
    guests1: '',
    guests2: '',
    occasion: '',
  });
  const [initialRender, setInitialrender]=useState(true)
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const filterAvailableTimes = () => {
      if (formData.date === today) {
        const currentTime = new Date().getHours();
        const filtered = availableTimes.filter((time) => {
          const timeHour = convertTo24HourFormat(time);
          return timeHour > currentTime;
        });
        setFilteredTimes(filtered);
      } else {
        setFilteredTimes(availableTimes);
      }
    };

    filterAvailableTimes();
  }, [formData.date, today, availableTimes]);

  const convertTo24HourFormat = (time) => {
    const [hour, modifier] = time.split(' ');
    let [hours] = hour.split(':').map(Number);
    if (modifier === 'PM' && hours < 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;
    return hours;
  };

  const validateForm = () => {
    let isValid = true;
    if (formData.date < today) {
      isValid = false;
    }
    if(formData.time ===''){
        isValid = false;
    }
    if (formData.guests1> 10 || formData.guests2>10) {
      isValid = false;
    }
    if (parseInt(formData.guests1) === 0) {
      isValid = false;
    }
    if (formData.guests1 === '') {
      isValid = false;
    }
    return isValid;
  };

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'date':
        if (value < today) {
          error = 'Please pick a future date';
        }
        else{
            error = '';
        }
        break;
      case 'time':
        if (value === '') {
          error = 'Please select time.';
        }
        else{
            error = '';
        }
        break;
      case 'guests1':
        if (!value || parseInt(value, 10) <= 0) {
          error = 'Atleast one adult guest is required.';
        } else if (parseInt(value, 10) > 10) {
          error = 'Maximum adults per reservation is 10.';
        }
        else{
            error = '';
        }
        break;
      case 'guests2':
        if (parseInt(value, 10) > 10) {
          error = 'Maximum children per reservation is 10.';
        }
        else{
            error = '';
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleInputChange = (e) => {
    if (initialRender){
        setInitialrender(false)
    }
    const { name, value } = e.target;
    onFormChange(name, value);
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
    console.log(`Field changed: ${name}, New Value: ${value}, Error: ${errors.date}, ${errors.time}, ${errors.guests}`); 
    console.log(`${formData.date}, ${formData.time}, ${formData.guests1}, ${formData.guests2}, ${formData.occasion},`)// Log field changes
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    //setHasSubmitted(true);  // Mark form as submitted
    if (validateForm(true)) {
      onBookingSubmit(formData);
      resetForm();
    }
  };

  const resetForm = () => {
    onFormChange('date', '');
    onFormChange('time', '');
    onFormChange('guests1', '1');
    onFormChange('guests2', '0');
    onFormChange('occasion', 'None');
  };

  return (
    <form onSubmit={handleSubmit} className="booking-form">
      <label htmlFor="res-date">Choose date</label>
      <input
        type="date"
        id="res-date"
        name="date"
        value={formData.date}
        min={today}
        onChange={handleInputChange}
        required
        aria-required="true"
        aria-describedby="date-error"
      />
      {errors.date && (
        <p id ="date-error" className="error-message" aria-live="polite">
          <FaExclamationCircle /> {errors.date}
        </p>
      )}

      <label htmlFor="res-time">Choose time</label>
      <select
        id="res-time"
        name="time"
        value={formData.time}
        onChange={handleInputChange}
        required
        aria-required="true"
        aria-describedby="time-error"
      >
        <option value="">Select time</option>
        {filteredTimes.map((time, index) => (
          <option key={index} value={time}>
            {time}
          </option>
        ))}
      </select>
      {errors.time && (
        <p id ="time-error" className="error-message" aria-live="polite">
          <FaExclamationCircle /> {errors.time}
        </p>
      )}

      <label htmlFor="guests">Number of guests</label>
      <div className="guest-inputs">
        <input
          type="number"
          id="guests1"
          name="guests1"
          placeholder="Adults"
          value={formData.guests1}
          min="1"
          max="10"
          onChange={handleInputChange}
          required
          aria-required="true"
          aria-describedby="guests-error"
        />
        <input
          type="number"
          id="guests2"
          name="guests2"
          placeholder="Children"
          value={formData.guests2}
          min="0"
          max="10"
          onChange={handleInputChange}
          aria-describedby="Children-guest-error"
        />
      </div>
      {errors.guests1 && (
        <p id ="guests-error" className="error-message" aria-live="polite">
          <FaExclamationCircle /> {errors.guests1}
        </p>
      )}
      {errors.guests2 && (
        <p id ="Children-guest-error" className="error-message" aria-live="polite">
          <FaExclamationCircle /> {errors.guests2}
        </p>
      )}

      <label htmlFor="occasion">Occasion</label>
      <select
        id="occasion"
        value={formData.occasion}
        name="occasion"
        onChange={handleInputChange}
        aria-label="Occasion for reservation"
      >
        <option value="None">None</option>
        <option value="Birthday">Birthday</option>
        <option value="Anniversary">Anniversary</option>
        <option value="Other">Other Celebration</option>
      </select>

      <button
        type="submit"
        name="submit reservation"
        className='leadtext'
        disabled={
            !formData.date ||
            !formData.time ||
            errors.date ||
            errors.time ||
            errors.guests1 ||
            errors.guests2
        }
        aria-label="Submit reservation">
        Submit Reservation
      </button>
    </form>
  );
};

export default BookingForm;