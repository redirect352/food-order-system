'use client';

import { Stack } from '@mantine/core';
import { FunctionComponent } from 'react';
import CartItem from './CartItem';
import { useAppSelector } from '@/shared/hooks';
import { selectCartItems } from '@/lib/features/cart/cartSlice';
import { TransitionList } from '@/UI';

interface CartListProps {

}

const CartList: FunctionComponent<CartListProps> = () => {
  const items = useAppSelector(selectCartItems);
  return (
  <Stack miw="100%" mih={100}>
    <TransitionList
      items={items.map(({ dishId }) => ({
        key: dishId,
        item: (<CartItem dishId={dishId} key={dishId} />),
      }))}
    />
  </Stack>
  );
};

export default CartList;
