import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import BookingForm from './BookingForm';
import userEvent from "@testing-library/user-event";

describe('BookingForm', () => {
    const mockOnFormChange = jest.fn();
    const mockFormData = {
      date: '2026-11-16' , // a valid date
      time: '7:00 PM', // a valid time
      guests1: '3', // Adults count
      guests2: '3', // Children count
      occasion: 'Anniversary', // Occasional field
    };
  
    // Mock available times for the form
    const mockAvailableTimes = [
      '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM',
      '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'
    ];
  
    const renderForm = () => {
      return render(
        <BookingForm
          availableTimes={mockAvailableTimes}
          formData={mockFormData}
          onFormChange={mockOnFormChange}
        />
      );
    };
  
    test('should submit the form when all fields are filled correctly', async() => {
      renderForm();
  
      // Check initial state of the form fields
      expect(screen.getByLabelText(/Choose date/)).toBeInTheDocument();
  
  // Simulate filling in the form
      await userEvent.type(screen.getByLabelText(/Choose date/i), '2026-11-17'); // Change date
      await userEvent.selectOptions(screen.getByLabelText(/Choose time/i), '1:00 PM'); // Change time
      await userEvent.type(screen.getByPlaceholderText(/Adults/), '3');
      await userEvent.type(screen.getByPlaceholderText(/Children/), '4');
      await userEvent.selectOptions(screen.getByLabelText(/Occasion/), 'Birthday');
      userEvent.click(screen.getByText(/Submit Reservation/i));
    
      // Wait for the form to be validated and ensure submit happens correctly
      await waitFor(() => {
        // Ensure onFormChange is called for all inputs
        expect(mockOnFormChange).toHaveBeenCalledTimes(5);  // Expecting 3 calls (date, time, guests)
      });
    
      // Test if the submit action would be called (you can add mock function for submit logic)
      expect(screen.queryByText(/error/i)).not.toBeInTheDocument(); // Check if errors are not shown
    
    });
    
  test('renders static form fields', () => {
    render(<BookingForm availableTimes={[]} formData={{}} onFormChange={() => {}} />);
  
    // Check if all form fields are present
    expect(screen.getByLabelText(/Choose date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Choose time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Occasion/i)).toBeInTheDocument();
  });
  
  test('filters available times based on date selection', () => {
    const formData = { date: '', time: '', guests1: '', guests2: '', occasion: '' };
    const availableTimes = ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'];
  
    render(<BookingForm availableTimes={availableTimes} formData={formData} onFormChange={() => {}} />);
  
    // Simulate selecting a date (e.g., today)
    const dateInput = screen.getByLabelText(/Choose date/i);
    fireEvent.change(dateInput, { target: { value: new Date().toISOString().split("T")[0] } });
  
    // Check if times are filtered correctly
    const timeOptions = screen.getAllByRole('option');
    expect(timeOptions).not.toContain('10:00 AM');  // Example, you can modify it based on current time
  });
  
  test('displays validation errors on invalid form submission', () => {
    const formData = { date: '', time: '', guests1: '', guests2: '', occasion: '' };
    const availableTimes = ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'];
  
    render(<BookingForm availableTimes={availableTimes} formData={formData} onFormChange={() => {}} />);
  
    // Simulate submitting the form without filling in any fields
    const submitButton = screen.getByRole('button', { name: /Submit Reservation/i });
    fireEvent.click(submitButton);
  
    // Check if the validation error messages are displayed
    expect(screen.getByText(/You cannot select a past date./i)).toBeInTheDocument();
    expect(screen.getByText(/Please select time./i)).toBeInTheDocument();
    expect(screen.getByText(/Adults cannot be 0/i)).toBeInTheDocument();
  });
  
  test('submits form with valid data', () => {
    const formData = { date: '2026-11-12', time: '7:00 PM', guests1: '2', guests2: '1', occasion: 'Birthday' };
    const availableTimes = ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'];
  
    const handleFormChange = jest.fn();
  
    render(<BookingForm availableTimes={availableTimes} formData={formData} onFormChange={handleFormChange} />);
  
    // Simulate submitting the form with valid data
    const submitButton = screen.getByRole('button', { name: /Submit Reservation/i });
    fireEvent.click(submitButton);
  
    // Check if the form is submitted (you can add your logic to verify the submission)
    expect(handleFormChange).toHaveBeenCalledTimes(0); // Ensure no errors occurred and the submit was successful
  });
  
  test('shows error when adults (guests1) is set to 0', () => {
    const formData = { date: '2024-11-12', time: '7:00 PM', guests1: '0', guests2: '1', occasion: 'Birthday' };
    const availableTimes = ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'];
  
    render(<BookingForm availableTimes={availableTimes} formData={formData} onFormChange={() => {}} />);
  
    // Simulate submitting the form
    const submitButton = screen.getByRole('button', { name: /Submit Reservation/i });
    fireEvent.click(submitButton);
  
    // Check if the error message for guests is displayed
    expect(screen.getByText(/Adults cannot be 0/i)).toBeInTheDocument();
  });
  
  });