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
  initialState: { value: 'allArticles' },
  reducers: {
    // TODO: fix this type error
    setActiveTab(
      state: any, //ActiveTabState
      action: ActiveTabAction,
    ) {
      console.log('setActiveTab dispatched');
      state.value = action.payload;
    },
  },
});

export const { setActiveTab } = activeTabSlice.actions;
export default activeTabSlice.reducer;
