import React from 'react';
import { FaCheckCircle } from "react-icons/fa";

const BookingConfirmation = () => {
    return (
        <div className="confirmed-booking">
          <div className="confirmation-icon"><FaCheckCircle/></div> {/* Green checkmark */}
          <h2 className='subtitle'>Booking Confirmed!</h2>
          <p className='paragrapgtext'>Your reservation has been successfully confirmed.</p>
          <p className='paragrapgtext'> We look forward to welcoming you!</p>
        </div>
      );
};

export default BookingConfirmation;