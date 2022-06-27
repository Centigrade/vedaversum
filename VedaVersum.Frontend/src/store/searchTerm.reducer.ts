import { createSlice } from '@reduxjs/toolkit';
/**
 * type for the search term state
 */
export interface SearchTermState {
  value: string;
}

/**
 * search term state handling
 */
const searchTermSlice = createSlice({
  name: 'searchTerm',
  initialState: { value: '' },
  reducers: {
    // TODO: fix actions type
    setSearchTerm(state: SearchTermState, action: any) {
      state.value = action.payload;
    },
  },
});

export const { setSearchTerm } = searchTermSlice.actions;
export default searchTermSlice.reducer;
