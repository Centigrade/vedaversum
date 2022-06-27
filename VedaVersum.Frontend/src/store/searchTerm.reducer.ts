import { createSlice } from '@reduxjs/toolkit';
//#region reducer types
/**
 * type for the search term state
 */
export interface SearchTermState {
  value: string;
}
/**
 * type for the search term actions
 */
export interface SearchTermAction {
  type: string;
  payload: string;
}
//#endregion

/**
 * search term state handling
 */
const searchTermSlice = createSlice({
  name: 'searchTerm',
  initialState: { value: '' },
  reducers: {
    setSearchTerm(state: SearchTermState, action: SearchTermAction) {
      console.log(action);

      state.value = action.payload;
    },
  },
});

export const { setSearchTerm } = searchTermSlice.actions;
export default searchTermSlice.reducer;
