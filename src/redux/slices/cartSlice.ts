// cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../components/ListPage/components/ProductCard';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  cartItems: CartItem[];
}

const initialState: CartState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCartRedux: (state, action: PayloadAction<CartItem>) => {
      state.cartItems.push(action.payload);
    },
    removeFromCartRedux: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.product.id !== action.payload
      );
    },
  },
});

export const { addToCartRedux, removeFromCartRedux } = cartSlice.actions;
export default cartSlice.reducer;
