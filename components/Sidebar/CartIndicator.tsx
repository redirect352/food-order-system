'use client';

import { Indicator, IndicatorProps } from '@mantine/core';
import { FunctionComponent } from 'react';
import { useAppSelector } from '@/shared/hooks';
import { selectCartItems, selectCartItemsIds } from '@/lib/features/cart/cartSlice';
import { selectMenuItemsById } from '@/lib/features/menu/menuSlice';

interface CartIndicatorProps extends IndicatorProps {

}

const CartIndicator: FunctionComponent<CartIndicatorProps> = (props) => {
  const items = useAppSelector(selectCartItems);
  const itemsIds = useAppSelector(selectCartItemsIds);
  const menuItems = useAppSelector(state => selectMenuItemsById(state, itemsIds));
  const totalPrice = items.reduce((sum, item) =>
    sum + item.dishCount * (menuItems.find(dish => dish.id === item.dishId)?.price ?? 0), 0);
  return (
    <Indicator
      label={`${totalPrice.toFixed(2)} руб.`}
      size={24}
      position="middle-end"
      offset={30}
      {...props}
    />
  );
};

export default CartIndicator;
