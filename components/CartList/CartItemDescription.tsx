'use client';

import { Stack, Group, ActionIcon, Text } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { FunctionComponent } from 'react';
import { CountInput } from '@/UI';
import classes from './styles.module.scss';
import { selectCartItemCount, changeDishCount, removeFromCart } from '@/lib/features/cart/cartSlice';
import { useAppSelector, useAppDispatch } from '@/shared/hooks';
import { selectMenuItem } from '@/lib/features/menu/menuSlice';

interface CartItemDescriptionProps {
  dishId: number
}

const CartItemDescription: FunctionComponent<CartItemDescriptionProps> =
({ dishId }) => {
  const { price, quantity, name, description, discount } =
  useAppSelector(state => selectMenuItem(state, dishId))!;
  const count = useAppSelector((state) => selectCartItemCount(state, dishId));
  const dispatch = useAppDispatch();
  const changeCount = (newCount:number) => dispatch(changeDishCount({ dishId, newCount }));
  const deleteItem = () => dispatch(removeFromCart(dishId));
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
