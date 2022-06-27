import { createSlice } from '@reduxjs/toolkit';
import { ActiveTab } from 'views/components/ArticleList';
/**
 * type for the active tab state
 */
export interface ActiveTabState {
  value: ActiveTab;
}

/**
 * active tab state handling
 */
const activeTabSlice = createSlice({
  name: 'activeTab',
  initialState: { value: 'allArticles' },
  reducers: {
    // TODO: fix this type error + actions type
    setActiveTab(state: any, action: any) {
      console.log('setActiveTab dispatched');
      state.value = action.payload;
    },
  },
});

export const { setActiveTab } = activeTabSlice.actions;
export default activeTabSlice.reducer;
