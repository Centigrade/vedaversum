import { createSlice } from '@reduxjs/toolkit';
import { ActiveTab } from 'views/components/ArticleList';

//#region reducer types
/**
 * type for the active tab state
 */
export interface ActiveTabState {
  value: ActiveTab;
}
/**
 * type for the active tab actions
 */
export interface ActiveTabAction {
  type: string;
  payload: ActiveTab;
}
//#endregion
/**
 * active tab state handling
 */
const activeTabSlice = createSlice({
  name: 'activeTab',
  initialState: { value: 'allArticles' as ActiveTab },
  reducers: {
    setActiveTab(state: ActiveTabState, action: ActiveTabAction) {
      state.value = action.payload;
    },
  },
});

export const { setActiveTab } = activeTabSlice.actions;
export default activeTabSlice.reducer;
