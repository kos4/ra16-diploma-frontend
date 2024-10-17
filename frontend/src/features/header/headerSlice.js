import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  search: false,
  cart: 0,
}

const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    showSearch: (state) => {
      state.search = !state.search;
    },
  },
});

export const { showSearch } = headerSlice.actions;
export default headerSlice.reducer;