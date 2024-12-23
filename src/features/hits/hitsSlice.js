import {
  buildCreateSlice,
  asyncThunkCreator,
} from "@reduxjs/toolkit";
import {fetchHitsApi} from "./hitsApi";

const initialState = {
  loading: false,
  products: null,
  error: null,
};

const createSliceWithThunk = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const hitsSlice = createSliceWithThunk({
  name: 'hits',
  initialState,
  reducers: create => ({
    fetchHits: create.asyncThunk(
      fetchHitsApi(),
      {
        pending: (state) => {
          state = {loading: true, ...initialState};
        },
        fulfilled: (state, action) => {
          state.error = null;
          state.products = action.payload;
        },
        rejected: (state, action) => {
          state.error = action.payload;
          state.loading = false;
        },
        settled: (state) => {
          state.loading = false;
        },
      }
    )
  }),
});

export const { fetchHits } = hitsSlice.actions;
export default hitsSlice.reducer;
