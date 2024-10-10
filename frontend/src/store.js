import { configureStore } from '@reduxjs/toolkit';
import hitsReducer from './features/hits/hitsSlice';

export const store = configureStore({
  reducer: {
    hits: hitsReducer,
  },
});
