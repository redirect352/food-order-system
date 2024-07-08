'use client';

import { Box, Group, Stack, Text, Checkbox } from '@mantine/core';
import { FunctionComponent } from 'react';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import classes from './styles.module.scss';
import CartItemDescription from './CartItemDescription';
import { ImageWithFallback } from '@/UI';

interface CartItemProps {
  price: number,
  name: string,
  description: string,
  quantity: string,
  image: string | StaticImport,
  discount : number,
  startCount: number
}

const CartItem: FunctionComponent<CartItemProps> =
({ price, quantity, name, description, image, discount, startCount }) => (
    <Group className={classes.cartItemContainer}>
      <Box className={classes.image}>
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

    </Group>
  );

export default CartItem;
