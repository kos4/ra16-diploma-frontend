import {createSlice} from "@reduxjs/toolkit";
import {getCart} from "./cartFunctions";

const initialState = {
  cart: getCart(),
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCart: (state, action) => {
      const product = action.payload;
      const item = state.cart.find(i => i.id === product.id && i.size === product.size);

      if (item === undefined) {
        state.cart.push(product);
      } else {
        item.count += product.count;
      }

      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    removeCart: (state, action) => {
      const diff = (item) => {
        return !(item.id === action.payload.id && item.size === action.payload.size);
      };
      state.cart = state.cart.filter(diff);
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    clearCart: (state) => {
      state.cart = [];
      localStorage.setItem('cart', '');
    },
  },
});

export const { addCart, removeCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;