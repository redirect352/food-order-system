import { createContext } from 'react';
import { CartItem } from '@/lib/features/cart/cartSlice';

export const CartItemContext = createContext<CartItem>({
  count: 0,
  menuPosition: {
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
  },
});
