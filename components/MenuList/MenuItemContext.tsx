import { createContext } from 'react';
import { MenuPositionDto } from '@/shared/types';

export const MenuListItemContext = createContext<MenuPositionDto>({
  id: -1,
  discount: -1,
  price: 0,
  dish: {
    id: -1,
    price: 0,
    name: '',
    description: '',
    quantity: '',
    discount: 0,
    calorieContent: '',
    providingCanteen: {
      name: '',
    },
  },
});
