import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  isLoggingOut: boolean,
}

const initialState: UserState = {
  isLoggingOut: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    startLogout: (state) => {
      state.isLoggingOut = true;
    },
    endLogout: (state) => {
      state.isLoggingOut = false;
    },
  },
  selectors: {
    selectIsLoggingOut: (state: UserState) => state.isLoggingOut,
  },
});
export const { selectIsLoggingOut } = userSlice.selectors;
export const { startLogout, endLogout } = userSlice.actions;
export default userSlice.reducer;
