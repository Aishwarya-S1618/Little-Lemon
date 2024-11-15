import React from 'react';

const BookingData = ({ bookingData , clearBookings}) => {
  return (
    <main className="booking-list-page">
      <h2 className='subtitle' aria-labelledby="reservations-title">Booking List</h2>
      {bookingData && bookingData.length > 0 ? (
        <section className="booking-list">
          <table role="table" aria-label="List of reservations">
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
        </section>)
        :(
          <p aria-live="polite" className="paragraphtext">
            No data available.
          </p>
          )
       }
    </main>
  );
};

export default BookingData;
