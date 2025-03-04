import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { localStorage, sessionStorage } from '../../storage';

interface UserState {
  isLoggingOut: boolean,
  isLoggedIn?: boolean,
  role?: string | null,
  interface: string | null,
}

const initialState: UserState = {
  isLoggingOut: false,
  isLoggedIn: undefined,
  role: undefined,
  interface: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>)=>{
      state.isLoggedIn = true;
      state.role = action.payload.replaceAll('_','-');
      state.interface = action.payload.replaceAll('_','-');
    },
    startLogout: (state) => {
      state.isLoggingOut = true;
      state.isLoggedIn = false;
      state.role = null;
      state.interface = null;
    },
    endLogout: (state) => {
      state.isLoggingOut = false;
      state.isLoggedIn = false;
      state.role = null;
      state.interface = null;
      localStorage.removeItem('persist:user');
      sessionStorage.removeItem('persist:cart');
    },
    initializeUserData: (state,action: PayloadAction<{ isLoggedIn: boolean, role: string | null}> ) =>{
      state.isLoggedIn = action.payload.isLoggedIn;
      state.role = action.payload.role?.replaceAll('_','-');
      if(!state.interface)
        state.interface = state.role ?? null;
    },
    changeUserInterface:(state, action: PayloadAction<string>)=>{
      state.interface = action.payload;
    }
  },
  selectors: {
    selectIsLoggingOut: (state: UserState) => state.isLoggingOut,
    selectIsLoggedIn: (state) => state.isLoggedIn,
    selectUserRole: (state) => state.role,
    selectUserInterface: (state) => state.interface,
  },
});
export const { selectIsLoggingOut, selectIsLoggedIn, selectUserRole, selectUserInterface } = userSlice.selectors;
export const { startLogout, endLogout, login, initializeUserData, changeUserInterface } = userSlice.actions;


const userPersistConfig = {
  key: "user",
  storage: localStorage,
  whitelist: ["interface"],
};

const persistedReducer = persistReducer(userPersistConfig, userSlice.reducer);

export default persistedReducer;