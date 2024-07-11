'use client';

import { Box, Group, Stack, Text, Checkbox, NumberFormatter } from '@mantine/core';
import { FunctionComponent } from 'react';
import { useDisclosure } from '@mantine/hooks';
import classes from './styles.module.scss';
import CartItemDescription from './CartItemDescription';
import { ImageWithFallback, ScalingCard } from '@/UI';
import ItemExtraInfoCard from '../ItemExtraInfoCard/ItemCard';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { removeFromCart, selectCartItemCount } from '@/lib/features/cart/cartSlice';
import { selectMenuItem } from '@/lib/features/menu/menuSlice';
import PriceHelper from '@/shared/helpers/priceHelper';

interface CartItemProps {
  dishId: number
}

const CartItem: FunctionComponent<CartItemProps> =
({ dishId }) => {
  const { price, image, discount } =
  useAppSelector(state => selectMenuItem(state, dishId))!;
  const [opened, { open, close }] = useDisclosure(false);
  const count = useAppSelector((state) => selectCartItemCount(state, dishId));
  const dispatch = useAppDispatch();
  const removeItem = () => dispatch(removeFromCart(dishId));
  return (
    <ScalingCard className={classes.cartItemContainer} p={0}>
      <Box className={classes.image} onClick={open} data-modal-opened={opened}>
        <ImageWithFallback
          style={{ borderRadius: '10px' }}
          src={image}
          alt="123"
          sizes="(max-width:62em) 80px, 120px"
          fill
        />
      </Box>
      <CartItemDescription
        dishId={dishId}
      />
      <Group align="flex-start" className={classes.priceBlock} visibleFrom="sm">
        {
          discount === 0 ?
          <Text className={classes.cartItemHeader}>
            <NumberFormatter
              value={count * price}
              decimalScale={2}
              suffix=" руб."
            />
          </Text>
          :
          <Stack gap="xs">
            <Text
              className={classes.cartItemHeader}
              c="var(--mantine-color-discount)"
            >
              <NumberFormatter
                value={PriceHelper.getPriceWithDiscount(price, discount, count)}
                decimalScale={2}
                suffix=" руб"
              />
            </Text>
            <Text className={classes.cartItemDescription} td="line-through">
              <NumberFormatter
                value={count * price}
                decimalScale={2}
                suffix=" руб."
              />
            </Text>
          </Stack>
        }
        <Checkbox />
      </Group>
      <ItemExtraInfoCard
        dishId={dishId}
        buttonText="Удалить из корзины"
        buttonAction={() => { removeItem(); close(); }}
        opened={opened}
        onClose={close}
      />
    </ScalingCard>
  );
};

export default CartItem;
