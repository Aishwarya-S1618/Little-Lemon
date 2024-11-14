import React, { useState, useEffect } from 'react';
import { FaExclamationCircle } from 'react-icons/fa';

const BookingForm = ({ availableTimes,  formData,  onFormChange,  onBookingSubmit}) => {
  const [filteredTimes, setFilteredTimes] = useState(availableTimes);
  const [errors, setErrors] = useState({ date: '', time: '', guests: '' });
  const today = new Date().toISOString().split("T")[0];

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
    let [hours] = hour.split(':').map(Number); // Remove unused `minutes` variable
    if (modifier === 'PM' && hours < 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;
    return hours;
  };

  const validateForm = () => {
    const newErrors = { date: '', time: '', guests: '' };
    let isValid = true;

    if (formData.date < today) {
      newErrors.date = 'You cannot select a past date.';
      isValid = false;
    }
    if(formData.time ===''){
      newErrors.time = 'Please select time.';
        isValid = false;
    }
    // if (formData.date === today && formData.time) {
    //   const selectedTimeHour = convertTo24HourFormat(formData.time);
    //   const currentTime = new Date().getHours();
    //   if (selectedTimeHour <= currentTime) {
    //     newErrors.time = 'Please select a future time.';
    //     isValid = false;
    //   }
    // }
    const totalGuests = parseInt(formData.guests1 || 0) + parseInt(formData.guests2 || 0);
    if (totalGuests > 500) {
      newErrors.guests = 'The maximum number of guests is 500.';
      isValid = false;
    }
    if (parseInt(formData.guests1 || 0) === 0) {
      newErrors.guests = 'Adults cannot be 0';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onFormChange(name, value);
    setErrors({ ...errors, [name]: '' });
    console.log(`Field changed: ${name}, New Value: ${value}`); // Log field changes
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      e.preventDefault();
      onBookingSubmit(formData);  // Submit the form data
      onFormChange('date', '');
      onFormChange('time', '');
      onFormChange('guests1', '');
      onFormChange('guests2', '');
      onFormChange('occasion', 'None');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="booking-form">
      <label htmlFor="res-date">Choose date</label>
      <input
        className='paragraphtext'
        type="date"
        id="res-date"
        name="date"
        value={formData.date}
        min={today}
        onChange={handleInputChange}
        required
      />
      {errors.date && <p className="error-message"><FaExclamationCircle /> {errors.date}</p>}

      <label htmlFor="res-time">Choose time</label>
      <select
        className='paragraphtext'
        id="res-time"
        name="time"
        value={formData.time}
        onChange={handleInputChange}
        required
      >
        <option value="">Select time</option>
        {filteredTimes.map((time, index) => (
          <option key={index} value={time}>
            {time}
          </option>
        ))}
      </select>
      {errors.time && <p className="error-message"><FaExclamationCircle /> {errors.time}</p>}

      <label htmlFor="guests">Number of guests</label>
      <div className="guest-inputs">
        <input
          type="number"
          id="guests1"
          name="guests1"
          placeholder="Adults"
          value={formData.guests1}
          min="0"
          max="500"
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          id="guests2"
          name="guests2"
          placeholder="Children"
          value={formData.guests2}
          min="0"
          max="500"
          onChange={handleInputChange}
        />
      </div>
      {errors.guests && <p className="error-message"><FaExclamationCircle /> {errors.guests}</p>}

      <label htmlFor="occasion">Occasion</label>
      <select
        className='paragraphtext'
        id="occasion"
        value={formData.occasion}
        name="occasion"
        onChange={handleInputChange}
      >
        <option value="None">None</option>
        <option value="Birthday">Birthday</option>
        <option value="Anniversary">Anniversary</option>
        <option value="Other">Other Celebration</option>
      </select>

      <button type="submit" className="leadtext">Submit Reservation</button>
    </form>
  );
};

export default BookingForm;
