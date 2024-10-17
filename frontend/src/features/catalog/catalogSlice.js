import {
  buildCreateSlice,
  asyncThunkCreator,
} from "@reduxjs/toolkit";
import {fetchCatalogCategoriesApi, fetchCatalogItemsApi} from "./catalogApi";
import {CATALOG_PER_PAGE} from "../../define";

const initialState = {
  loading: false,
  categories: null,
  items: null,
  error: null,
  load: false,
  loadingMore: false,
  params: {
    offset: 0,
    q: '',
  },
};

const createSliceWithThunk = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const catalogSlice =  createSliceWithThunk({
  name: 'catalog',
  initialState,
  reducers: create => ({
    resetState: create.reducer(state => initialState),
    search: create.asyncThunk(
      fetchCatalogItemsApi(),
      {
        pending: (state) => {
          state.loading = true;
        },
        fulfilled: (state, action) => {
          state.items = action.payload;
          state.load = action.payload && action.payload.length === CATALOG_PER_PAGE;
          state.params = {...state.params, offset: CATALOG_PER_PAGE};
        },
        rejected: (state, action) => {
          state.error = action.payload;
        },
        settled: (state) => {
          state.loading = false;
        },
      }
    ),
    setQuerySearch: create.reducer((state, action) => {
      state.params = {...state.params, q: action.payload};
    }),
    loadMore: create.asyncThunk(
      fetchCatalogItemsApi(),
      {
        pending: (state) => {
          state.loadingMore = true;
        },
        fulfilled: (state, action) => {
          state.items = [...state.items, ...action.payload];
          state.load = action.payload && action.payload.length === CATALOG_PER_PAGE;
          state.params = {...state.params, offset: state.params.offset + CATALOG_PER_PAGE};
        },
        rejected: (state, action) => {
          state.error = action.payload;
        },
        settled: (state) => {
          state.loadingMore = false;
        },
      }
    ),
    filterCategories: create.reducer((state, action) => {
      state.params = {...state.params, categoryId: action.payload, q: '', offset: 0};
      state.items = null;
    }),
    fetchCategories: create.asyncThunk(
      fetchCatalogCategoriesApi(),
      {
        pending: (state) => {
          state.loading = true;
          state.categories = null;
          state.params = {...state.params, offset: CATALOG_PER_PAGE};
        },
        fulfilled: (state, action) => {
          state.categories = action.payload;
        },
        rejected: (state, action) => {
          state.error = action.payload;
        },
        settled: (state) => {
          state.loading = false;
        },
      }
    ),
    fetchItems: create.asyncThunk(
      fetchCatalogItemsApi(),
      {
        pending: (state) => {
          state.loading = true;
          state.items = null;
        },
        fulfilled: (state, action) => {
          state.items = action.payload;
          state.load = action.payload && action.payload.length === CATALOG_PER_PAGE;
          state.params = {...state.params, offset: CATALOG_PER_PAGE};
        },
        rejected: (state, action) => {
          state.error = action.payload;
        },
        settled: (state) => {
          state.loading = false;
        },
      }
    )
  }),
});

export const { fetchCategories, fetchItems, filterCategories, loadMore, setQuerySearch, search, resetState } = catalogSlice.actions;
export default catalogSlice.reducer;
