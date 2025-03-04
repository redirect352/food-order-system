'use client'

import { createSelector, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/lib/store';
import { MenuPositionDto, OfficeDto } from '@/shared/types';
import { PriceHelper } from '@/shared/helpers';
import { sessionStorage } from '@/lib/storage';
import { persistReducer } from 'redux-persist';
import { MakeOrderItem } from '../../api/orderApi';

export type CartItem = { 
  menuPosition: MenuPositionDto, 
  count: number,
  comment: string,
};

interface CartState {
  cartItems: Array<CartItem>,
  deliveryDestination: OfficeDto | null,
}

export const deliveryDestinationKey = 'deliveryDestination';

const initialState: CartState = {
  cartItems: [],
  deliveryDestination: null,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<MenuPositionDto>) => {
      const index = state.cartItems.findIndex(item => item.menuPosition.id === action.payload.id);
      if (index !== -1) {
        state.cartItems[index].count += 1;
      } else {
        state.cartItems.push({ menuPosition: action.payload, count: 1, comment: '' });
      }
    },
    increaseDishCount: (state, action: PayloadAction<number>) => {
      const index = state.cartItems.findIndex(item => item.menuPosition.id === action.payload);
      if (index !== -1) {
        state.cartItems[index].count += 1;
      }
    },
    decreaseDishCount: (state, action: PayloadAction<number>) => {
      const index = state.cartItems.findIndex(item => item.menuPosition.id === action.payload);
      if (index !== -1) {
        state.cartItems[index].count -= 1;
        if (state.cartItems[index].count <= 0) {
          state.cartItems = state.cartItems.filter(item => item.menuPosition.id !== action.payload);
        }
      }
    },
    changeDishCount: (state, action: PayloadAction<{ menuPositionId:number, newCount:number }>) => {
      const { menuPositionId, newCount } = action.payload;
      const index = state.cartItems.findIndex(
        item => item.menuPosition.id === menuPositionId
      );
      if (index !== -1 && newCount > 0) {
        state.cartItems[index].count = newCount;
      } else if (index !== -1 && newCount <= 0) {
        state.cartItems = state.cartItems.filter(item => item.menuPosition.id !== menuPositionId);
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter(item =>
        item.menuPosition.id !== action.payload);
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
    changeDeliveryDestination: (state, action: PayloadAction<OfficeDto | null>) =>{
      state.cartItems = [];
      if(action.payload)
        localStorage.setItem(deliveryDestinationKey, JSON.stringify(action.payload) )
      else 
        localStorage.removeItem(deliveryDestinationKey);
      state.deliveryDestination = action.payload;
    },
    initializeStore: (state)=>{
      const deliveryStr = localStorage.getItem(deliveryDestinationKey);
      if(deliveryStr){
        const deliveryOffice = JSON.parse(deliveryStr);
        if(deliveryOffice as OfficeDto) state.deliveryDestination =  deliveryOffice as OfficeDto;
      }
    },
    changeDishComment: (state, action: PayloadAction<{ menuPositionId:number, newComment:string }>) => {
      const { menuPositionId, newComment } = action.payload;
      const index = state.cartItems.findIndex(
        item => item.menuPosition.id === menuPositionId
      );
      if (index !== -1 ) {
        state.cartItems[index].comment = newComment;
      }
    },
  },
  selectors: {
    selectFullPrice: (state) => state.cartItems.reduce(
      (sum, { menuPosition, count: dishCount }) =>
        sum + dishCount * (menuPosition.price), 0),
    selectTotalDiscount: (state) => state.cartItems.reduce(
      (sum, { menuPosition, count }) =>
        sum + PriceHelper.getDiscountValue(menuPosition.price, menuPosition.discount, count), 0),
    selectFinalPrice: (state) =>
      selectFullPrice({ cart: state }) - selectTotalDiscount({ cart: state }),
    selectCartItemsIds: createSelector(
      (state: CartState) => state.cartItems,
      items => items.map(item => (item.menuPosition.id))
    ),
    selectCartItemsCounts: createSelector(
      (state: CartState) => state.cartItems,
      items => items.map(item => (item.count))
    ),
    selectCreateOrderArgument: createSelector(
      (state: CartState) => state.cartItems,
      (state: CartState) => state.deliveryDestination,
      (items, destination) => items.reduce((prev, {comment, count, menuPosition}) => {
        prev.menuPositions.push({
          count,
          comment,
          id: menuPosition.id
        });
        return prev;
      }, {
        menuPositions: new Array<MakeOrderItem>(),
        deliveryDestinationId:destination?.id ?? -1,
      })
    ),
    selectDeliveryDestination: ({deliveryDestination}) => deliveryDestination,
    selectCartItem: createSelector(
      (state: CartState, id: number) => state.cartItems.find(val => val.menuPosition.id === id),
      item => item,
    ),
  }
});
export const {
  increaseDishCount,
  removeFromCart,
  decreaseDishCount,
  changeDishCount,
  addToCart,
  clearCart,
  changeDeliveryDestination,
  initializeStore,
  changeDishComment,
} = cartSlice.actions;

export const {
  selectFullPrice,
  selectTotalDiscount,
  selectFinalPrice,
  selectCreateOrderArgument,
  selectDeliveryDestination,
  selectCartItem
} = cartSlice.selectors;
// Other code such as selectors can use the imported `RootState` type
export const selectCartItems = (state: RootState) => state.cart.cartItems;
// export const selectCartItemsIds = createSelector(
//   (state:RootState) => state.cart.cartItems,
//   items => items.map(item => item.dishId));
export const selectCartItemsLength = (state: RootState) => state.cart.cartItems.length;
export const selectCartTotalCount = (state: RootState) =>
  state.cart.cartItems.reduce((sum, item) => sum + item.count, 0);
export const selectCartItemCount = (state: RootState, menuPositionId: number) =>
  state.cart.cartItems.find(item => item.menuPosition.id === menuPositionId)?.count ?? 0;


const cartPersistConfig = {
  key: "cart",
  storage: sessionStorage,
  whitelist: ["cartItems", "deliveryDestination"],
};

const persistedReducer = persistReducer(cartPersistConfig, cartSlice.reducer);

export default persistedReducer;
