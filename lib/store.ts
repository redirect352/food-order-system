/* eslint-disable import/no-named-as-default */
import { Action, combineReducers, configureStore } from '@reduxjs/toolkit';
import cartSlice from './features/cart/cartSlice';
import menuSlice from './features/menu/menuSlice';
import { authApi } from './api/authApi';
import { userApi } from './api/userApi';
import { menuApi } from './api/menuApi';
import { orderApi } from './api/orderApi';
import userSlice, { endLogout } from './features/user/userSlice';
import { baseApiWithAuth, baseApiWithoutAuth } from './api/baseApi';

const appReducer = combineReducers({
  cart: cartSlice,
  menu: menuSlice,
  user: userSlice,
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [menuApi.reducerPath]: menuApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
  [baseApiWithoutAuth.reducerPath]: baseApiWithoutAuth.reducer,
  [baseApiWithAuth.reducerPath]: baseApiWithAuth.reducer,
});
const rootReducer = (state : any, action : Action) => {
  if (action.type === endLogout.type) return appReducer(undefined, action);
  return appReducer(state, action);
};
export const makeStore = () => configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
        .concat(authApi.middleware)
        .concat(userApi.middleware)
        .concat(menuApi.middleware)
        .concat(orderApi.middleware)
        .concat(baseApiWithoutAuth.middleware)
        .concat(baseApiWithAuth.middleware),
    });
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
