import { createSlice } from '@reduxjs/toolkit';
/**
 * type for the notifications read state
 */
export interface NotificationsReadState {
  value: boolean;
}

/**
 * notifications read state handling
 */
const NotificationsReadSlice = createSlice({
  name: 'notificationsRead',
  initialState: { value: false },
  reducers: {
    // TODO: fix actions type
    setNotificationsRead(state: NotificationsReadState, actions: any) {
      console.log('setNotificationsRead dispatched');
      state.value = actions.payload;
    },
  },
});

export const { setNotificationsRead } = NotificationsReadSlice.actions;
export default NotificationsReadSlice.reducer;
