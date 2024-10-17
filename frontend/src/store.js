import { configureStore } from '@reduxjs/toolkit';
import hitsReducer from './features/hits/hitsSlice';
import catalogReducer from './features/catalog/catalogSlice';
import headerReducer from './features/header/headerSlice';

export const store = configureStore({
  reducer: {
    hits: hitsReducer,
    catalog: catalogReducer,
    header: headerReducer,
  },
});
