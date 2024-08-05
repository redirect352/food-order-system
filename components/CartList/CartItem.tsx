'use client';

import { Box, Stack } from '@mantine/core';
import { FunctionComponent } from 'react';
import { useDisclosure } from '@mantine/hooks';
import classes from './styles.module.scss';
import CartItemDescription from './CartItemDescription';
import { ImageWithFallback, PriceLabel, ScalingCard } from '@/UI';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { removeFromCart, selectCartItemCount } from '@/lib/features/cart/cartSlice';
import { selectMenuItem } from '@/lib/features/menu/menuSlice';
import PriceHelper from '@/shared/helpers/priceHelper';
import { ItemExtraInfoCard } from '@/components';

interface CartItemProps {
  dishId: number
}

const CartItem: FunctionComponent<CartItemProps> =
({ dishId }) => {
  const { price, image, discount } =
  useAppSelector(state => selectMenuItem(state, dishId))!;
  const [opened, { open, close }] = useDisclosure(false);
  const count = useAppSelector((state) => selectCartItemCount(state, dishId));
  const priceWithDiscount = discount === 0 ?
  undefined
  :
  PriceHelper.getPriceWithDiscount(price, discount, count);
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
      <Stack gap="xs" className={classes.priceBlock} visibleFrom="sm">
        <PriceLabel
          fullPrice={price * count}
          priceWithDiscount={priceWithDiscount}
          classes={{ mainPrice: classes.cartItemHeader, oldPrice: classes.cartItemDescription }}
      />
      </Stack>
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
