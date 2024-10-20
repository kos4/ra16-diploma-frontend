import {createSlice} from "@reduxjs/toolkit";
import {getCart} from "../cart/cartFunctions";

const cart = getCart();
const initialState = {
  search: false,
  cart: cart.length,
};

const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    updateCart: (state) => {
      const cart = getCart();
      state.cart = cart.length;
    },
    showSearch: (state) => {
      state.search = !state.search;
    },
  },
});

export const { showSearch, updateCart } = headerSlice.actions;
export default headerSlice.reducer;