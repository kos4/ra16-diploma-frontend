import {asyncThunkCreator, buildCreateSlice} from "@reduxjs/toolkit";
import {saveOrderApi} from "./orderApi";

const initialState = {
  loading: false,
  status: false,
  error: null,
};

const createSliceWithThunk = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const orderSlice = createSliceWithThunk({
  name: 'order',
  initialState,
  reducers: create => ({
    saveOrder: create.asyncThunk(
      saveOrderApi(),
      {
        pending: (state) => {
          state = {...initialState, loading: true}
        },
        fulfilled: (state, action) => {
          state.status = true;
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
export const { saveOrder } = orderSlice.actions;
export default orderSlice.reducer;