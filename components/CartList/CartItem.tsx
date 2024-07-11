'use client';

import { Box, Group, Stack, Text, Checkbox } from '@mantine/core';
import { FunctionComponent } from 'react';
import { useDisclosure } from '@mantine/hooks';
import classes from './styles.module.scss';
import CartItemDescription from './CartItemDescription';
import { ImageWithFallback, ScalingCard } from '@/UI';
import { Dish } from '@/shared/types';
import ItemExtraInfoCard from '../ItemExtraInfoCard/ItemCard';

interface CartItemProps {
  dish: Dish
  startCount: number
}

const CartItem: FunctionComponent<CartItemProps> =
({ dish, startCount }) => {
  const { price, quantity, name, description, image, discount } = dish;
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <Group className={classes.cartItemContainer}>
      <Box className={classes.image} onClick={open} data-modal-opened={opened}>
        <ImageWithFallback
          style={{ borderRadius: '10px' }}
          src={image}
          alt="123"
          fill
        />
      </Box>
      <CartItemDescription
        price={price}
        name={name}
        description={description}
        quantity={quantity}
        discount={discount}
        startCount={startCount}
      />
      <Group align="flex-start" className={classes.priceBlock} visibleFrom="sm">
        {
          discount === 0 ?
          <Text className={classes.cartItemHeader}>{price} руб.</Text>
          :
          <Stack gap="xs">
            <Text
              className={classes.cartItemHeader}
              c="var(--mantine-color-discount)"
            >
              {((price * (100 - discount)) / 100).toFixed(2)} руб.
            </Text>
            <Text className={classes.cartItemDescription} td="line-through">
              {price} руб.
            </Text>
          </Stack>
        }
        <Checkbox />
      </Group>
      <ItemExtraInfoCard
        dish={dish}
        buttonText="Удалить из корзины"
        buttonAction={close}
        opened={opened}
        onClose={close}
      />
    </Group>
  );
};

export default CartItem;
