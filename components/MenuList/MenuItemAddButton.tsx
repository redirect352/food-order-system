'use client';

import { Button, Flex, Text } from '@mantine/core';
import { FunctionComponent } from 'react';
import { CountInput } from '@/UI';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { changeDishCount, selectCartItemCount } from '@/lib/features/cart/cartSlice';
import PriceHelper from '@/shared/helpers/priceHelper';

interface MenuItemAddButtonProps {
  menuPositionId: number,
  price: number,
  discount: number
}

const MenuItemAddButton: FunctionComponent<MenuItemAddButtonProps> =
({ menuPositionId, price, discount }) => {
  const color = discount === 0 ? '' : 'var(--mantine-color-discount)';
  const finalPrice = PriceHelper.getPriceWithDiscount(price, discount);
  const count = useAppSelector((state) => selectCartItemCount(state, menuPositionId));
  const dispatch = useAppDispatch();
  const changeCount = (newCount:number) => dispatch(changeDishCount({
    dishId: menuPositionId,
    newCount,
  }));
  return (
    <Flex justify="space-between" align="center" w="100%">
      {
      count > 0
      ?
      <>
        <Text fw={500} size="md" fz="xl">
          {(PriceHelper.getPriceWithDiscount(price, discount, count))}
          <Text span fz={14}> руб.</Text>
        </Text>
        <CountInput count={count} changeCount={changeCount} />
      </>
      :
      <>
        <Flex align="flex-end" gap={4}>
          <Text fw={500} size="md" fz="xl" c={color}>{finalPrice} <Text span fz={14} c={color}> руб.</Text></Text>
          {discount !== 0 && <Text c="dimmed" size="xs" td="line-through">{price} руб.</Text>}
        </Flex>
        <Button variant="outline" size="xs" onClick={() => changeCount(1)}>Добавить</Button>
      </>
      }
    </Flex>
  );
};

export default MenuItemAddButton;
