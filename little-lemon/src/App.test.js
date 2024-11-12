import { initializeTimes } from './App';  // Import from App.js where initializeTimes is defined
import { timeReducer } from './App';

describe('initializeTimes', () => {
  it('should return an array of available times', () => {
    const result = initializeTimes();
    const expectedTimes = [
      '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM',
      '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'
    ];

    // Check if the returned result matches the expected array of times
    expect(result.availableTimes).toEqual(expectedTimes);

    // Ensure that the result is an array
    expect(Array.isArray(result.availableTimes)).toBe(true);
    expect(result.availableTimes.length).toBe(expectedTimes.length); // Ensure the length matches
  });
});

describe('timeReducer', () => {
  const initialState = []; // Initial state should be an empty array (before the action is dispatched)
  
  it('should return the initial state when no action is provided', () => {
    const result = timeReducer(initialState, {});
    expect(result).toEqual(initialState); // When no action, the state should stay the same
  });

  it('should update the available times when UPDATE_TIMES action is dispatched', () => {
    const newTimes = [
      '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM'
    ];
    const action = { type: 'UPDATE_TIMES', payload: newTimes };

    const result = timeReducer(initialState, action);
    expect(result).toEqual(newTimes); // The state should now match the new available times
  });

  it('should handle unknown action types', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' };
    const result = timeReducer(initialState, unknownAction);
    expect(result).toEqual(initialState); // The state should remain unchanged for unknown actions
  });
});


describe('initializeTimes initial', () => {
  test('should return the correct initial available times', () => {
    const expectedTimes = ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM',
    '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'];
    const result = initializeTimes();
    expect(result.availableTimes).toEqual(expectedTimes);
  });
});
