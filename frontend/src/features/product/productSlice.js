import {asyncThunkCreator, buildCreateSlice} from "@reduxjs/toolkit";
import {fetchProductApi} from "./productApi";

const initialState = {
  loading: false,
  product: null,
  error: null,
  size: '',
  quantity: 1,
};

const createSliceWithThunk = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const productSlice = createSliceWithThunk({
  name: 'product',
  initialState,
  reducers: create => ({
    decrementQuantity: create.reducer((state) => {
      if (state.quantity > 1) {
        state.quantity--;
      }
    }),
    incrementQuantity: create.reducer((state) => {
      if (state.quantity < 10) {
        state.quantity++;
      }
    }),
    selectSize: create.reducer((state, action) => {
      state.size = action.payload;
    }),
    fetchProduct: create.asyncThunk(
      fetchProductApi(),
      {
        pending: (state) => {
          state = {...initialState, loading: true}
        },
        fulfilled: (state, action) => {
          state.product = action.payload;
        },
        rejected: (state, action) => {
          state.error = action.payload;
        },
        settled: (state) => {
          state.loading = false;
        },
      }
    ),
  }),
});
export const { fetchProduct, selectSize, incrementQuantity, decrementQuantity } = productSlice.actions;
export default productSlice.reducer;
