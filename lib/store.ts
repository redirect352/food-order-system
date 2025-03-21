import { Action, combineReducers, configureStore } from '@reduxjs/toolkit';
import cartSlice from './features/cart/cartSlice';
import menuSlice from './features/menu/menuSlice';
import { authApi } from './api/authApi';
import { userApi } from './api/userApi';
import { menuApi } from './api/menuApi';
import { orderApi } from './api/orderApi';
import userSlice, { endLogout } from './features/user/userSlice';
import { baseApiWithAuth, baseApiWithoutAuth } from './api/baseApi';
import persistStore from 'redux-persist/es/persistStore';
import { persistReducer } from 'redux-persist';
import { localStorage, sessionStorage } from './storage';

const appReducer = combineReducers({
  cart: cartSlice,
  menu: menuSlice,
  user: userSlice,
  [authApi.reducerPath]: authApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
  [baseApiWithoutAuth.reducerPath]: baseApiWithoutAuth.reducer,
  [baseApiWithAuth.reducerPath]: baseApiWithAuth.reducer,
});
const rootReducer = (state : any, action : Action) => {
  if (action.type === endLogout.type) return appReducer(undefined, action);
  return appReducer(state, action);
};

const rootPersistConfig = {
  key: "root",
  storage: sessionStorage,
  whitelist: ["cart"],
};

const rootPersistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const makeStore = () => configureStore({
      reducer: rootPersistedReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
        .concat(authApi.middleware)
        .concat(userApi.middleware)
        .concat(menuApi.middleware)
        .concat(orderApi.middleware)
        .concat(baseApiWithoutAuth.middleware)
        .concat(baseApiWithAuth.middleware),
});
export const store = configureStore({
  reducer: rootPersistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({serializableCheck:false})
    .concat(authApi.middleware)
    .concat(userApi.middleware)
    .concat(menuApi.middleware)
    .concat(orderApi.middleware)
    .concat(baseApiWithoutAuth.middleware)
    .concat(baseApiWithAuth.middleware),
});
export  const persistedStore = persistStore(store);
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
