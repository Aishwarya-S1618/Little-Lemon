import React, { useState } from 'react';

function BookingForm() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState('');
  const [occasion, setOccasion] = useState('');

  const availableTimes = ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log({ date, time, guests, occasion });
  };

  return (
    <form onSubmit={handleSubmit} className="booking-form">
      <div className="form-group">
        <label htmlFor="res-date" className="leadtext">Choose date</label>
        <input
          className='paragraphtext'
          type="date"
          id="res-date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="res-time" className="leadtext">Choose time</label>
        <select
          className='paragraphtext'
          id="res-time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        >
          {availableTimes.map((time, index) => (
            <option key={index} value={time}>{time}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="guests" className="leadtext">Number of guests</label>
        <input
        className='paragraphtext'
          type="number"
          id="guests"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="occasion" className="leadtext">Occasion</label>
        <select
        className='paragraphtext'
          id="occasion"
          value={occasion}
          onChange={(e) => setOccasion(e.target.value)}
          required
        >
          <option value="">Select Occasion</option>
          <option value="Birthday">Birthday</option>
          <option value="Anniversary">Anniversary</option>
        </select>
      </div>

      <button type="submit" className="leadtext">Submit Reservation</button>
    </form>
  );
}

export default BookingForm;
