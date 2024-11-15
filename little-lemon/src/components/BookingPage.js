import BookingForm from './BookingForm.js';
import { useNavigate } from 'react-router-dom';
import '../api.js';
// This page is rendered on click of reserve a table button Enables user to make a reservation
const BookingPage = ({availableTimes, formData,  onFormChange, liftUpBookingData}) => {
  const navigate = useNavigate();
  // Function to handle form data updates and adding new bookings to bookingData
  const handleBookingSubmit = async (formData) => {
    // Call the submitAPI to simulate an API submission
    const success = await window.submitAPI(formData);
    if (success) {
      //console.log('Booking submission', formData);
      liftUpBookingData({
        id: Date.now(),  // Unique ID based on timestamp
        date: formData.date,
        time: formData.time,
        guests1: formData.guests1,
        guests2: formData.guests2,
        occasion: formData.occasion,
      });
      navigate('/confirmation');
    } else {
      console.error('Booking submission failed');
    }
  };

  return (
    <main className="booking-page" >
      <h1 className="typefaces" aria-label="Little Lemon Table Reservation">Reserve a Table</h1>
      <BookingForm
        availableTimes={availableTimes}
        formData={formData}
        onFormChange={onFormChange}
        onBookingSubmit={handleBookingSubmit}
      />
    </main>
  );
};

export default BookingPage;
