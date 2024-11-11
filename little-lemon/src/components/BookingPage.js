import BookingForm from './BookingForm';
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate} from 'react-router-dom';


const BookingPage = () => {
const navigate = useNavigate();
return(
  <div className="booking-page">
    <button className="leadtext back-button reserve-button" onClick={() =>navigate(`/`)}>
      <FaArrowLeft className="back-icon" />Back
    </button>
    <span className="typefaces">Reserve a Table</span>
    <BookingForm />
  </div>
);
};

export default BookingPage;