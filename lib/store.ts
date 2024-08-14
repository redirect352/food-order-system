/* eslint-disable import/no-named-as-default */
import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './features/cart/cartSlice';
import menuSlice from './features/menu/menuSlice';
import { authApi } from './api/authApi';
import { userApi } from './api/userApi';
import { menuApi } from './api/menuApi';

export const makeStore = () => configureStore({
      reducer: {
        cart: cartSlice,
        menu: menuSlice,
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [menuApi.reducerPath]: menuApi.reducer,

      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
        .concat(authApi.middleware)
        .concat(userApi.middleware)
        .concat(menuApi.middleware),
    });
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
