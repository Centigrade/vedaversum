import { createSlice } from '@reduxjs/toolkit';

//#region reducer types
/**
 * type for the notifications Clicked state
 */
export interface NotificationsClickedState {
  value: boolean;
}
/**
 * type for the search term actions
 */
export interface NotificationsClickedAction {
  type: string;
  payload: boolean;
}
//#endregion

/**
 * notifications Clicked state handling
 */
const NotificationsClickedSlice = createSlice({
  name: 'notificationsClicked',
  initialState: { value: false },
  reducers: {
    setNotificationsClicked(state: NotificationsClickedState, actions: NotificationsClickedAction) {
      state.value = actions.payload;
    },
  },
});

export const { setNotificationsClicked } = NotificationsClickedSlice.actions;
export default NotificationsClickedSlice.reducer;
