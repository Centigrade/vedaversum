import { createSlice } from '@reduxjs/toolkit';
/**
 * type for the notifications counter state
 */
export interface NotificationsCounterState {
  value: number;
}

/**
 * notifications counter state handling
 */
const notificationsCounterSlice = createSlice({
  name: 'notificationsCounter',
  initialState: { value: 0 },
  reducers: {
    increaseNotificationsCounter(state: NotificationsCounterState) {
      console.log('increaseNotificationsCounter dispatched');
      state.value += 1;
    },
    resetNotificationsCounter(state: NotificationsCounterState) {
      console.log('resetNotificationsCounter dispatched');
      state.value = 0;
    },
  },
});

export const { increaseNotificationsCounter, resetNotificationsCounter } = notificationsCounterSlice.actions;
export default notificationsCounterSlice.reducer;
