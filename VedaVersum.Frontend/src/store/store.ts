import { configureStore } from '@reduxjs/toolkit';
import activeTabReducer, { ActiveTabState } from './activeTab.reducer';
import lastModifiedArticlesReducer, { LastModifiedArticlesState } from './lastModifiedArticles.reducer';
import notificationsClickedReducer, { NotificationsClickedState } from './notificationsClicked.reducer';
import notificationsCounterReducer, { NotificationsCounterState } from './notificationsCounter.reducer';

/**
 * type for the global store
 */
export interface RootState {
  activeTab: ActiveTabState;
  notificationsCounter: NotificationsCounterState;
  notificationsClicked: NotificationsClickedState;
  lastModifiedArticles: LastModifiedArticlesState;
}

/**
 * global store
 */
export const store = configureStore({
  reducer: {
    // active tab that defines which articles are shown in the list of articles
    activeTab: activeTabReducer,
    // amount of new notifications
    notificationsCounter: notificationsCounterReducer,
    // variable to (re)set the articles view when the user clicked on the notifications
    notificationsClicked: notificationsClickedReducer,
    // list of articles that were last modified = articles that are shown to the user when notifications are clicked
    lastModifiedArticles: lastModifiedArticlesReducer,
  },
});
