// BookingForm.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookingForm from './components/BookingForm';
import '@testing-library/jest-dom';


describe('BookingForm Component', () => {

  const mockAvailableTimes = ['17:00','17:30', '18:00','18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30'];
  const mockOnFormChange = jest.fn();
  const mockOnBookingSubmit = jest.fn();


  it('should display error messages when submitting with invalid data', async () => {
    render(
      <BookingForm
        availableTimes={mockAvailableTimes}
        formData={{ date: '', time: '', guests1: '', guests2: '', occasion: 'None' }}
        onFormChange={mockOnFormChange}
        onBookingSubmit={mockOnBookingSubmit}
      />
    );

    await userEvent.click(screen.getByRole('button', { name: /submit reservation/i }));
    expect(screen.getByText(/you cannot select a past date/i)).toBeInTheDocument();
    expect(screen.getByText(/please select time/i)).toBeInTheDocument();
    expect(screen.getByText(/adults cannot be 0/i)).toBeInTheDocument();
  });


  it('should display an error if guests1 (adults) is set to 0', async () => {
    render(
      <BookingForm
        availableTimes={mockAvailableTimes}
        formData={{ date: '', time: '', guests1: '', guests2: '', occasion: 'None' }}
        onFormChange={mockOnFormChange}
        onBookingSubmit={mockOnBookingSubmit}
      />
    );

    await userEvent.type(screen.getByPlaceholderText(/adults/i), '0');
    await userEvent.click(screen.getByRole('button', { name: /submit reservation/i }));

    expect(screen.getByText(/adults cannot be 0/i)).toBeInTheDocument();
    expect(mockOnBookingSubmit).not.toHaveBeenCalled();
  });

});