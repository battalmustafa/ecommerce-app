import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import generalSlice from './slices/generalSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    general: generalSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;