import { createSlice } from '@reduxjs/toolkit';
import { Dish } from '@/shared/types';
import { menuItems } from '@/testData/menuData';
import { RootState } from '@/lib/store';

interface MenuState {
  menuItems: Dish[]

}

const initialState: MenuState = {
  menuItems,
};

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
  },
});

export const selectMenuItem = (state: RootState, id : number) =>
  state.menuSlice.menuItems.find(item => item.id === id);
export const selectMenuItems = (state: RootState, idList : number[]) =>
  state.menuSlice.menuItems.filter(item => idList.includes(item.id));

export default menuSlice.reducer;
