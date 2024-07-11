/* eslint-disable import/no-named-as-default */
import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './features/cart/cartSlice';
import menuSlice from './features/menu/menuSlice';
// ...

export const makeStore = () => configureStore({
      reducer: {
        cartSlice,
        menuSlice,
      },
    });
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
