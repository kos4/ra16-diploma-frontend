import { configureStore } from '@reduxjs/toolkit';
import hitsReducer from './features/hits/hitsSlice';
import catalogReducer from './features/catalog/catalogSlice';
import headerReducer from './features/header/headerSlice';
import productReducer from './features/product/productSlice';
import cartReducer from './features/cart/cartSlice';
import orderReducer from './features/order/orderSlice';

export const store = configureStore({
  reducer: {
    hits: hitsReducer,
    catalog: catalogReducer,
    header: headerReducer,
    product: productReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});
