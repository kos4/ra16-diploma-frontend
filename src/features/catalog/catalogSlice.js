import {
  buildCreateSlice,
  asyncThunkCreator,
} from "@reduxjs/toolkit";
import {fetchCatalogCategoriesApi, fetchCatalogItemsApi} from "./catalogApi";
import {CATALOG_PER_PAGE} from "../../define";

const initialState = {
  loadingItems: false,
  loadingMore: false,
  loadingCategories: false,
  categories: null,
  items: null,
  errorItems: null,
  errorCategories: null,
  errorMore: null,
  load: false,
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
    search: create.asyncThunk(
      fetchCatalogItemsApi(),
      {
        pending: (state) => {
          state.loadingItems = true;
          state.errorItems = null;
          state.items = null;
        },
        fulfilled: (state, action) => {
          state.errorItems = null;
          state.items = action.payload;
          state.load = action.payload && action.payload.length === CATALOG_PER_PAGE;
          state.params = {...state.params, offset: CATALOG_PER_PAGE};
        },
        rejected: (state, action) => {
          state.errorItems = action.payload;
          state.loadingItems = false;
        },
        settled: (state) => {
          state.loadingItems = false;
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
          state.errorMore = null;
        },
        fulfilled: (state, action) => {
          state.errorMore = null;
          state.items = [...state.items, ...action.payload];
          state.load = action.payload && action.payload.length === CATALOG_PER_PAGE;
          state.params = {...state.params, offset: state.params.offset + CATALOG_PER_PAGE};
        },
        rejected: (state, action) => {
          state.errorMore = action.payload;
          state.loadingMore = false;
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
          state.loadingCategories = true;
          state.categories = null;
          state.params = {...state.params, offset: CATALOG_PER_PAGE};
          state.errorCategories = null;
        },
        fulfilled: (state, action) => {
          state.categories = action.payload;
          state.errorCategories = null;
        },
        rejected: (state, action) => {
          state.errorCategories = action.payload;
          state.loadingCategories = false;
        },
        settled: (state) => {
          state.loadingCategories = false;
        },
      }
    ),
    fetchItems: create.asyncThunk(
      fetchCatalogItemsApi(),
      {
        pending: (state) => {
          state.loadingItems = true;
          state.items = null;
          state.errorItems = null;
        },
        fulfilled: (state, action) => {
          state.errorItems = null;
          state.items = action.payload;
          state.load = action.payload && action.payload.length === CATALOG_PER_PAGE;
          state.params = {...state.params, offset: CATALOG_PER_PAGE};
        },
        rejected: (state, action) => {
          state.errorItems = action.payload;
          state.loadingItems = false;
        },
        settled: (state) => {
          state.loadingItems = false;
        },
      }
    )
  }),
});

export const { fetchCategories, fetchItems, filterCategories, loadMore, setQuerySearch, search } = catalogSlice.actions;
export default catalogSlice.reducer;
