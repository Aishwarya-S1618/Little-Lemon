import { render, screen, fireEvent } from '@testing-library/react';
import BookingData from './components/BookingData';
import '@testing-library/jest-dom';

describe('BookingData Component Tests', () => {
  test('displays booking data from localStorage', () => {
    const mockBookingData = [
      { date: '2024-12-24', time: '21:00', guests1: '3', guests2: '0', occasion: 'Anniversary' }
    ];
    render(<BookingData bookingData={mockBookingData} />);

    expect(screen.getByText('21:00')).toBeInTheDocument();
    expect(screen.getByText('Anniversary')).toBeInTheDocument();
  });

  test('clears booking data when clear button is clicked', () => {
    const mockBookingData = [
      { date: '2024-12-24', time: '21:00', guests1: '3', guests2: '0', occasion: 'Anniversary' }
    ];
    const mockClearBookings = jest.fn();

    render(<BookingData bookingData={mockBookingData} clearBookings={mockClearBookings} />);

    fireEvent.click(screen.getByText('Clear All Bookings'));

    // Verify that clearBookings function was called
    expect(mockClearBookings).toHaveBeenCalled();
  });
});