import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increaseCounter(state: any) {
      console.log('increaseCounter dispatched');
      state.value += 1;
    },
    decreaseCounter(state: any) {
      console.log('decreaseCounter dispatched');
      state.value -= 1;
    },
    increaseCounterByValue(state: any, action: any) {
      console.log('increaseCounter dispatched');
      state.value += action.payload;
    },
  },
});

export const { increaseCounter, decreaseCounter, increaseCounterByValue } = counterSlice.actions;
export default counterSlice.reducer;
