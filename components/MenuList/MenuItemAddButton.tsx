'use client';

import { Button, Flex, Text } from '@mantine/core';
import { FunctionComponent, useContext } from 'react';
import { CountInput } from '@/UI';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { addToCart, changeDishCount, selectCartItemCount } from '@/lib/features/cart/cartSlice';
import PriceHelper from '@/shared/helpers/priceHelper';
import { MenuListItemContext } from './MenuItemContext';

interface MenuItemAddButtonProps {
}

const MenuItemAddButton: FunctionComponent<MenuItemAddButtonProps> = () => {
  const menuPosition = useContext(MenuListItemContext);
  const { id, price, discount } = menuPosition;
  const color = discount === 0 ? '' : 'var(--mantine-color-discount)';
  const finalPrice = PriceHelper.getPriceWithDiscount(price, discount);
  const count = useAppSelector((state) => selectCartItemCount(state, id));
  const dispatch = useAppDispatch();
  const addNewPositionToCart = () => dispatch(addToCart(menuPosition));
  const changeCount = (newCount:number) => dispatch(changeDishCount({
    menuPositionId: id,
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
        <Button variant="outline" visibleFrom="sm" size="xs" onClick={addNewPositionToCart}>Добавить</Button>
        <Button variant="outline" hiddenFrom="sm" size="md" onClick={addNewPositionToCart}>Добавить</Button>
      </>
      }
    </Flex>
  );
};

export default MenuItemAddButton;
