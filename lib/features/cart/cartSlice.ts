import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/lib/store';

interface CartState {
  cartItems: Array<{ dishId: number, dishCount: number }>,

}

const initialState: CartState = {
  cartItems: [{ dishId: 1, dishCount: 1 }],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increaseDishCount: (state, action: PayloadAction<number>) => {
      const index = state.cartItems.findIndex(item => item.dishId === action.payload);
      if (index !== -1) {
        state.cartItems[index].dishCount += 1;
      } else {
        state.cartItems.push({ dishId: action.payload, dishCount: 1 });
      }
    },
    decreaseDishCount: (state, action: PayloadAction<number>) => {
      const index = state.cartItems.findIndex(item => item.dishId === action.payload);
      if (index !== -1) {
        state.cartItems[index].dishCount -= 1;
        if (state.cartItems[index].dishCount <= 0) {
          state.cartItems = state.cartItems.filter(item => item.dishId !== action.payload);
        }
      }
    },
    changeDishCount: (state, action: PayloadAction<{ dishId:number, newCount:number }>) => {
      const { dishId, newCount } = action.payload;
      const index = state.cartItems.findIndex(item => item.dishId === dishId);
      if (index === -1 && newCount > 0) {
        state.cartItems.push({ dishId, dishCount: newCount });
      } else if (newCount > 0) {
        state.cartItems[index].dishCount = newCount;
      } else {
        state.cartItems = state.cartItems.filter(item => item.dishId !== dishId);
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter(item => item.dishId !== action.payload);
    },
  },
});

export const {
  increaseDishCount,
  removeFromCart,
  decreaseDishCount,
  changeDishCount,
} = cartSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCartItems = (state: RootState) => state.cartSlice.cartItems;
export const selectCartItemsLenght = (state: RootState) => state.cartSlice.cartItems.length;
export const selectCartTotalCount = (state: RootState) =>
  state.cartSlice.cartItems.reduce((sum, item) => sum + item.dishCount, 0);
export const selectCartItemCount = (state: RootState, dishId: number) =>
  state.cartSlice.cartItems.find(item => item.dishId === dishId)?.dishCount ?? 0;

export default cartSlice.reducer;
