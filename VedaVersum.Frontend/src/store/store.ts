import { configureStore } from '@reduxjs/toolkit';
import activeTabReducer, { ActiveTabState } from './activeTab.reducer';
import notificationsCounterReducer from './notificationsCounter.reducer';
import notificationsReadReducer, { NotificationsReadState } from './notificationsRead.reducer';

/**
 * type for the global store
 */
export interface RootState {
  activeTab: ActiveTabState;
  notificationsCounter: { value: number };
  notificationsRead: NotificationsReadState;
}

/**
 * global store
 */
export const store = configureStore({
  reducer: {
    activeTab: activeTabReducer,
    notificationsCounter: notificationsCounterReducer,
    notificationsRead: notificationsReadReducer,
  },
});
