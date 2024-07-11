'use client';

import { Indicator, IndicatorProps } from '@mantine/core';
import { FunctionComponent } from 'react';
import { useAppSelector } from '@/shared/hooks';
import { selectCartItems } from '@/lib/features/cart/cartSlice';
import { selectMenuItems } from '@/lib/features/menu/menuSlice';

interface CartIndicatorProps extends IndicatorProps {

}

const CartIndicator: FunctionComponent<CartIndicatorProps> = (props) => {
  const items = useAppSelector(selectCartItems);
  const menuItems = useAppSelector(state => selectMenuItems(state, items.map(item => item.dishId)));
  const totalPrice = items.reduce((sum, item) =>
    sum + item.dishCount * (menuItems.find(dish => dish.id === item.dishId)?.price ?? 0), 0);
  return (
    <Indicator label={`${totalPrice.toFixed(2)} руб.`} size={24} position="middle-end" offset={25} {...props} />
  );
};

export default CartIndicator;
