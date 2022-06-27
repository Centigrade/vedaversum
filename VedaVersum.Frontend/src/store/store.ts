import { configureStore } from '@reduxjs/toolkit';
import activeTabReducer, { ActiveTabState } from './activeTab.reducer';
import notificationsClickedReducer, { NotificationsClickedState } from './notificationsClicked.reducer';
import notificationsCounterReducer, { NotificationsCounterState } from './notificationsCounter.reducer';
import searchTermReducer, { SearchTermState } from './searchTerm.reducer';

/**
 * type for the global store
 */
export interface RootState {
  activeTab: ActiveTabState;
  searchTerm: SearchTermState;
  notificationsCounter: NotificationsCounterState;
  notificationsClicked: NotificationsClickedState;
}

/**
 * global store
 */
export const store = configureStore({
  reducer: {
    activeTab: activeTabReducer,
    searchTerm: searchTermReducer,
    notificationsCounter: notificationsCounterReducer,
    notificationsClicked: notificationsClickedReducer,
  },
});
