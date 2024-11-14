import React from 'react';

const BookingData = ({ bookingData , clearBookings}) => {
  return (
    <div className="booking-list-page">
      <h2 className='subtitle'>Booking List</h2>
      <table>
        <thead className='leadtext'>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Time</th>
            <th>Adult guests</th>
            <th>Children guests</th>
            <th>Occasion</th>
          </tr>
        </thead>
        <tbody className='paragraphtext'>
          {bookingData.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.id}</td>
              <td>{booking.date}</td>
              <td>{booking.time}</td>
              <td>{booking.guests1}</td>
              <td>{booking.guests2}</td>
              <td>{booking.occasion}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className='reserve-button' onClick={clearBookings}>Clear All Bookings</button>
    </div>
  );
};

export default BookingData;
