import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookingForm from './components/BookingForm';

describe('BookingForm Component', () => {
  const mockOnFormChange = jest.fn();
  const mockOnBookingSubmit = jest.fn();
  const today = new Date().toISOString().split('T')[0];
  const mockAvailableTimes = ['17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30'];

  const initialFormData = {
    date: '',
    time: '',
    guests1: '1',
    guests2: '0',
    occasion: 'None',
  };

  const setup = () => {
    render(
      <BookingForm
        availableTimes={mockAvailableTimes}
        formData={initialFormData}
        onFormChange={mockOnFormChange}
        onBookingSubmit={mockOnBookingSubmit}
      />
    );
  };
  const validSetup = () => {
    render(
      <BookingForm
        availableTimes={mockAvailableTimes}
        formData={{
          date: '2026-02-01',
          time: '22:30',
          guests1: '2',
          guests2: '0',
          occasion: 'Anniversary',
        }}
        onFormChange={mockOnFormChange}
        onBookingSubmit={mockOnBookingSubmit}
      />
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form fields correctly', () => {
    setup();
    expect(screen.getByLabelText(/Choose date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Choose time/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Adults/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Children/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Occasion/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit Reservation/i })).toBeDisabled();
  });

  it('validates the date field correctly', () => {
    setup();
    const dateInput = screen.getByLabelText(/Choose date/i);
    fireEvent.change(dateInput, { target: { value: '2000-01-01' } });

    expect(mockOnFormChange).toHaveBeenCalledWith('date', '2000-01-01');
    expect(screen.getByText(/Please pick a future date/i)).toBeInTheDocument();
  });

  it('validates the time field correctly', () => {
    setup();
    const timeSelect = screen.getByLabelText(/Choose time/i);
    fireEvent.change(timeSelect, { target: { value: '' } });

    expect(mockOnFormChange).toHaveBeenCalledWith('time', '');
    expect(screen.getByText(/Please select time/i)).toBeInTheDocument();
  });

  it('validates the number of guests correctly (Adults)', () => {
    setup();
    const guests1Input = screen.getByPlaceholderText(/Adults/i);
    fireEvent.change(guests1Input, { target: { value: '0' } });

    expect(mockOnFormChange).toHaveBeenCalledWith('guests1', '0');
    expect(screen.getByText(/Atleast one adult guest is required/i)).toBeInTheDocument();
  });

  it('validates the number of guests correctly (Children)', () => {
    setup();
    const guests2Input = screen.getByPlaceholderText(/Children/i);
    fireEvent.change(guests2Input, { target: { value: '11' } });

    expect(mockOnFormChange).toHaveBeenCalledWith('guests2', '11');
    expect(screen.getByText(/Maximum children per reservation is 10/i)).toBeInTheDocument();
  });

  it('enables the submit button only when all fields are valid', () => {
    validSetup();
    expect(screen.getByRole('button', { name: /Submit Reservation/i })).toBeEnabled();
  });

  it('calls onFormChange with change in formData', () => {
    validSetup();
    fireEvent.change(screen.getByLabelText(/Choose date/i), { target: { value: today } });
    fireEvent.change(screen.getByLabelText(/Choose time/i), { target: { value: '22:00' } });
    fireEvent.change(screen.getByPlaceholderText(/Adults/i), { target: { value: '1' } });
    fireEvent.change(screen.getByPlaceholderText(/Children/i), { target: { value: '2' } });
    fireEvent.change(screen.getByLabelText(/occasion/i), { target: { value: 'Birthday' } });

    expect(mockOnFormChange).toHaveBeenCalledTimes(5);
  });

  it('does not submit the form when there are validation errors', () => {
    setup();
    const submitButton = screen.getByRole('button', { name: /Submit Reservation/i });
    fireEvent.click(submitButton);

    expect(mockOnBookingSubmit).not.toHaveBeenCalled();
  });
});
