'use client';

import { Stack, Group, ActionIcon, Text } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { FunctionComponent, useContext } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { CountInput } from '@/UI';
import classes from './styles.module.scss';
import { changeDishCount, removeFromCart } from '@/lib/features/cart/cartSlice';
import { useAppDispatch } from '@/shared/hooks';
import { CartItemContext } from './context/CartItemContext';

interface CartItemDescriptionProps {
}

const CartItemDescription: FunctionComponent<CartItemDescriptionProps> = () => {
  const { menuPosition, count } = useContext(CartItemContext);
  const { dish, id } = menuPosition;
  const { quantity, name, description } = dish;
  const isMobile = useMediaQuery('(max-width: 62em)');
  const dispatch = useAppDispatch();
  const changeCount = (newCount:number) =>
    dispatch(changeDishCount({ menuPositionId: id, newCount }));
  const deleteItem = () => dispatch(removeFromCart(id));
  return (
    <>
    <Stack
      className={classes.centralSegment}
      align="flex-start"
      gap="xs"
      justify="space-between"
    >
      <Stack gap="xs">
        <Text className={classes.cartItemHeader}>{name}</Text>
        <Text
          className={classes.cartItemDescription}
          lineClamp={isMobile ? 2 : 4}
        >
          {description}
        </Text>
        <Text className={classes.cartItemDescription}>{quantity}</Text>
      </Stack>

      <Group>
        <CountInput
          size={isMobile ? 24 : 32}
          labelProps={{ fz: isMobile ? 'sm' : 'lg' }}
          count={count}
          changeCount={changeCount}
        />
        <ActionIcon
          variant="transparent"
          className={classes.removeIcon}
          onClick={deleteItem}
          visibleFrom="sm"
        >
          <IconTrash stroke={1.5} size={24} />
        </ActionIcon>
      </Group>
    </Stack>
    </>
  );
};

export default CartItemDescription;
