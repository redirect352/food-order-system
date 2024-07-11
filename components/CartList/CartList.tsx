'use client';

import { Stack } from '@mantine/core';
import { FunctionComponent } from 'react';
import CartItem from './CartItem';
import { useAppSelector } from '@/shared/hooks';
import { selectCartItems } from '@/lib/features/cart/cartSlice';

interface CartListProps {

}

const CartList: FunctionComponent<CartListProps> = () => {
  const items = useAppSelector(selectCartItems);
  return (
  <Stack miw="100%" mih={100}>
    {
      items.map(({ dishId }) => <CartItem dishId={dishId} key={dishId} />)
    }
  </Stack>
  );
};

export default CartList;
