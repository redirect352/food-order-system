'use client';

import { Button, Flex, Text } from '@mantine/core';
import { FunctionComponent } from 'react';
import { CountInput } from '@/UI';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { changeDishCount, selectCartItemCount } from '@/lib/features/cart/cartSlice';
import PriceHelper from '@/shared/helpers/priceHelper';

interface MenuItemAddButtonProps {
  dishId: number,
  price: number,
  discount: number
}

const MenuItemAddButton: FunctionComponent<MenuItemAddButtonProps> =
({ dishId, price, discount }) => {
  const color = discount === 0 ? '' : 'var(--mantine-color-discount)';
  const finalPrice = discount === 0 ? undefined : PriceHelper.getPriceWithDiscount(price, discount);
  const count = useAppSelector((state) => selectCartItemCount(state, dishId));
  const dispatch = useAppDispatch();
  const changeCount = (newCount:number) => dispatch(changeDishCount({ dishId, newCount }));
  return (
    <Flex justify="space-between" align="center" w="100%">
      {
      count > 0
      ?
      <>
        <Text fw={500}>
          {(PriceHelper.getPriceWithDiscount(price, discount, count))}
          <Text span fz={14}> руб.</Text>
        </Text>
        <CountInput count={count} changeCount={changeCount} />
      </>
      :
      <>
        <Flex align="flex-end" gap={4}>
        <Text fw={500} c={color}>{finalPrice} <Text span fz={14} c={color}> руб.</Text></Text>
        {discount !== 0 && <Text c="dimmed" size="xs" td="line-through">{price} руб.</Text>}
        </Flex>
        <Button variant="outline" size="xs" onClick={() => changeCount(1)}>Добавить</Button>
      </>
      }
    </Flex>
  );
};

export default MenuItemAddButton;
