import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  isLoggingOut: boolean,
  isLoggedIn?: boolean,
  role?: string | null,
}

const initialState: UserState = {
  isLoggingOut: false,
  isLoggedIn: undefined,
  role: undefined,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>)=>{
      state.isLoggedIn = true;
      state.role = action.payload;
    },
    startLogout: (state) => {
      state.isLoggingOut = true;
      state.isLoggedIn = false;
      state.role = null;
    },
    endLogout: (state) => {
      state.isLoggingOut = false;
      state.isLoggedIn = false;
      state.role = null;
    },
    initializeUserData: (state,action: PayloadAction<{ isLoggedIn: boolean, role: string | null}> ) =>{
      state.isLoggedIn = action.payload.isLoggedIn;
      state.role = action.payload.role;
    }
  },
  selectors: {
    selectIsLoggingOut: (state: UserState) => state.isLoggingOut,
    selectIsLoggedIn: (state) => state.isLoggedIn,
    selectUserRole: (state) => state.role,
  },
});
export const { selectIsLoggingOut, selectIsLoggedIn, selectUserRole } = userSlice.selectors;
export const { startLogout, endLogout, login, initializeUserData } = userSlice.actions;
export default userSlice.reducer;