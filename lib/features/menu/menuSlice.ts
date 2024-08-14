import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MenuPositionDto } from '@/shared/types';
import { RootState } from '@/lib/store';

interface MenuState {
  menuItems: MenuPositionDto[]

}

const initialState: MenuState = {
  menuItems: [],
};

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setMenu: (state, action: PayloadAction<MenuPositionDto[]>) => {
      state.menuItems = action.payload.map((item) => ({
        ...item,
        dish: {
          ...item.dish,
          calorieContent: +item.dish.calorieContent ?
          +item.dish.calorieContent : item.dish.calorieContent,
        },
        price: item.price / 100,
      }));
    },
  },
  selectors: {
    selectMenuItemsById:
    createSelector(
      [
        (state: MenuState) => state.menuItems,
        (state: MenuState, idList:number[]) => idList,
      ],
      (items, idList) => items.filter(item => idList.includes(item.id))
    ),
    selectMenuItems: (state: MenuState) => state.menuItems,
  },
});
export const { selectMenuItemsById, selectMenuItems } = menuSlice.selectors;
export const selectMenuItem = (state: RootState, id : number) =>
  state.menu.menuItems.find(item => item.id === id);
export const { setMenu } = menuSlice.actions;

export default menuSlice.reducer;
