'use client';

import { Stack, Group, ActionIcon, Text } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { FunctionComponent, useContext } from 'react';
import { CountInput } from '@/UI';
import classes from './styles.module.scss';
import { changeDishCount, removeFromCart } from '@/lib/features/cart/cartSlice';
import { useAppDispatch } from '@/shared/hooks';
import { CartItemContext } from './context/CartItemContext';

interface CartItemDescriptionProps {
}

const CartItemDescription: FunctionComponent<CartItemDescriptionProps> = () => {
  const { menuPosition, count } = useContext(CartItemContext);
  const { price, dish, discount, id } = menuPosition;
  const { quantity, name, description } = dish;
  const dispatch = useAppDispatch();
  const changeCount = (newCount:number) =>
    dispatch(changeDishCount({ menuPositionId: id, newCount }));
  const deleteItem = () => dispatch(removeFromCart(id));
  return (
    <>
    {/* mobile */}
    <Stack align="flex-start" gap={3} className={classes.centralSegment} hiddenFrom="sm">
        {
          discount === 0 ?
          <Text className={classes.cartItemHeader}>{price} руб.</Text>
          :
          <Group gap={0} align="flex-end">
          <Text className={classes.cartItemHeader} c="var(--mantine-color-discount)">
            {((price * (100 - discount)) / 100).toFixed(2)} руб.
          </Text>
          <Text span className={classes.cartItemDescription} td="line-through" lh="xs">
              {price} руб.
          </Text>
          </Group>
        }

        <Text fz="lg">
          {name}
        </Text>
        <Text className={classes.cartItemDescription} lineClamp={2}>{description}</Text>
        <Text className={classes.cartItemDescription}>{quantity}</Text>
        <Group>
          <CountInput count={count} changeCount={changeCount} />
          <ActionIcon
            variant="transparent"
            className={classes.removeIcon}
            onClick={deleteItem}
          >
            <IconTrash stroke={1} />
          </ActionIcon>
        </Group>
    </Stack>
    {/* desktop */}
    <Stack align="flex-start" gap="xs" className={classes.centralSegment} visibleFrom="sm">
      <Text className={classes.cartItemHeader}>{name}</Text>
      <Text className={classes.cartItemDescription} lineClamp={2}>{description}</Text>
      <Text className={classes.cartItemDescription}>{quantity}</Text>
      <Group>
        <CountInput count={count} changeCount={changeCount} />
        <ActionIcon variant="transparent" className={classes.removeIcon} onClick={deleteItem}>
          <IconTrash stroke={1} />
        </ActionIcon>
      </Group>
    </Stack>
    </>
  );
};

export default CartItemDescription;
