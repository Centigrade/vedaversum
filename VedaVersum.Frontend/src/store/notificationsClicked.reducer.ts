import { createSlice } from '@reduxjs/toolkit';
/**
 * type for the notifications Clicked state
 */
export interface NotificationsClickedState {
  value: boolean;
}

/**
 * notifications Clicked state handling
 */
const NotificationsClickedSlice = createSlice({
  name: 'notificationsClicked',
  initialState: { value: false },
  reducers: {
    // TODO: fix actions type
    setNotificationsClicked(state: NotificationsClickedState, actions: any) {
      state.value = actions.payload;
    },
  },
});

export const { setNotificationsClicked } = NotificationsClickedSlice.actions;
export default NotificationsClickedSlice.reducer;
