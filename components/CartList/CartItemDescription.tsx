'use client';

import { FunctionComponent, useContext } from 'react';
import { Stack, Group, ActionIcon, Text, Chip, TextInput } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';
import { CountInput } from '@/UI';
import { changeDishCount, removeFromCart } from '@/lib/features/cart/cartSlice';
import { useAppDispatch } from '@/shared/hooks';
import { CartItemContext } from './context/CartItemContext';
import CartItemCommentInput from '@/components/inputs/CartItemCommentInput';
import classes from './styles.module.scss';

interface CartItemDescriptionProps {
}

const CartItemDescription: FunctionComponent<CartItemDescriptionProps> = () => {
  const { menuPosition, count, comment } = useContext(CartItemContext);
  const { dish, id } = menuPosition;
  const { quantity, name, description } = dish;
  const isMobile = useMediaQuery('(max-width: 62em)');
  const dispatch = useAppDispatch();
  const changeCount = (newCount:number) =>
    dispatch(changeDishCount({ menuPositionId: id, newCount }));
  const deleteItem = () => dispatch(removeFromCart(id));
  return (
    <Stack
      className={classes.centralSegment}
      gap="xs"
    >
      <Stack gap="xs" className={classes.centralSegmentText}>
        <Text className={classes.cartItemHeader}>{name}</Text>
        <Text
          className={classes.cartItemDescription}
          lineClamp={isMobile ? 2 : 3}
        >
          {description}
        </Text>
        <Text className={classes.cartItemDescription}>{quantity}</Text>
      </Stack>
      <CartItemCommentInput menuPositionId={id} />
      <Group mt={'auto'} onClick={e=>e.stopPropagation()}>
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
  );
};

export default CartItemDescription;
