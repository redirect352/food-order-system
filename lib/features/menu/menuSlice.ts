import { createSelector, createSlice } from '@reduxjs/toolkit';
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
  selectors: {
    selectMenuItems:
    createSelector(
      [
        (state: MenuState) => state.menuItems,
        (state: MenuState, idList:number[]) => idList,
      ],
      (items, idList) => items.filter(item => idList.includes(item.id))
    ),
  },
});
export const { selectMenuItems } = menuSlice.selectors;
export const selectMenuItem = (state: RootState, id : number) =>
  state.menu.menuItems.find(item => item.id === id);
// export const selectMenuItems = (state: RootState, idList : number[]) =>
//   state.menuSlice.menuItems.filter(item => idList.includes(item.id));

export default menuSlice.reducer;
