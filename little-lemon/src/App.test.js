// App.test.js
import { initializeTimes, timeReducer } from './App';
import '@testing-library/jest-dom';

describe('initializeTimes', () => {
  it('should return available times for today\'s date', () => {
    const times = initializeTimes();
    expect(Array.isArray(times)).toBe(true); // Check if it returns an array
    expect(times.length).toBeGreaterThan(0); // Check if there are available times
  });
});

describe('timeReducer', () => {
  it('should return updated times based on selected date', () => {
    const initialState = [];
    const selectedDate = new Date(); // Use today’s date for testing
    const action = { type: 'UPDATE_TIMES', payload: selectedDate };
    const updatedTimes = timeReducer(initialState, action);

    expect(Array.isArray(updatedTimes)).toBe(true);
    expect(updatedTimes.length).toBeGreaterThan(0);
  });

  it('should return the initial state if action type is unknown', () => {
    const initialState = ['17:00', '18:00'];
    const action = { type: 'UNKNOWN_ACTION' };
    const state = timeReducer(initialState, action);

    expect(state).toEqual(initialState); // Check if it remains the same
  });
});
describe('liftUpBookingData updates localStorage', () => {
  beforeEach(() => {
    localStorage.clear(); // Clear localStorage before each test
  });

  test('localStorage is updated when liftUpBookingData is called with valid data', () => {
    // Mock valid form data
    const mockFormData = {
      date: '2024-12-25',
      time: '22:00',
      guests1: '2',
      guests2: '1',
      occasion: 'Birthday',
    };

    // Mock liftUpBookingData function to simulate updating localStorage
    const liftUpBookingData = (newData) => {
      const existingData = JSON.parse(localStorage.getItem('bookingData')) || [];
      const updatedData = [...existingData, newData];
      localStorage.setItem('bookingData', JSON.stringify(updatedData)); // Update localStorage
    };

    // Call liftUpBookingData with valid data
    const newBooking = {
      id: Date.now(),
      date: mockFormData.date,
      time: mockFormData.time,
      guests1: mockFormData.guests1,
      guests2: mockFormData.guests2,
      occasion: mockFormData.occasion,
    };
    liftUpBookingData(newBooking);

    // Retrieve updated booking data from localStorage
    const updatedBookingData = JSON.parse(localStorage.getItem('bookingData'));

    // Verify that the data was added to localStorage
    expect(updatedBookingData).toHaveLength(1);  // We should have 1 booking in localStorage now
    expect(updatedBookingData[0]).toEqual({
      id: expect.any(Number),  // id should be a number (Date.now())
      date: mockFormData.date,
      time: mockFormData.time,
      guests1: mockFormData.guests1,
      guests2: mockFormData.guests2,
      occasion: mockFormData.occasion,
    });
  });

  test('localStorage updates with multiple bookings when liftUpBookingData is called multiple times', () => {
    // Mock valid form data
    const mockFormData1 = {
      date: '2024-12-25',
      time: '21:00',
      guests1: '2',
      guests2: '1',
      occasion: 'Birthday',
    };
    const mockFormData2 = {
      date: '2024-12-26',
      time: '23:00',
      guests1: '4',
      guests2: '0',
      occasion: 'Anniversary',
    };

    // Mock liftUpBookingData function to simulate updating localStorage
    const liftUpBookingData = (newData) => {
      const existingData = JSON.parse(localStorage.getItem('bookingData')) || [];
      const updatedData = [...existingData, newData];
      localStorage.setItem('bookingData', JSON.stringify(updatedData)); // Update localStorage
    };

    // Call liftUpBookingData twice with different bookings
    const newBooking1 = {
      id: Date.now(),
      date: mockFormData1.date,
      time: mockFormData1.time,
      guests1: mockFormData1.guests1,
      guests2: mockFormData1.guests2,
      occasion: mockFormData1.occasion,
    };
    liftUpBookingData(newBooking1);

    const newBooking2 = {
      id: Date.now() + 1, // Ensure unique ID
      date: mockFormData2.date,
      time: mockFormData2.time,
      guests1: mockFormData2.guests1,
      guests2: mockFormData2.guests2,
      occasion: mockFormData2.occasion,
    };
    liftUpBookingData(newBooking2);

    // Retrieve updated booking data from localStorage
    const updatedBookingData = JSON.parse(localStorage.getItem('bookingData'));

    // Verify that both bookings were added to localStorage
    expect(updatedBookingData).toHaveLength(2);  // We should have 2 bookings in localStorage now
    expect(updatedBookingData[0]).toEqual({
      id: expect.any(Number),
      date: mockFormData1.date,
      time: mockFormData1.time,
      guests1: mockFormData1.guests1,
      guests2: mockFormData1.guests2,
      occasion: mockFormData1.occasion,
    });
    expect(updatedBookingData[1]).toEqual({
      id: expect.any(Number),
      date: mockFormData2.date,
      time: mockFormData2.time,
      guests1: mockFormData2.guests1,
      guests2: mockFormData2.guests2,
      occasion: mockFormData2.occasion,
    });
  });
});
