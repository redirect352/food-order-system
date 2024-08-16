'use client';

import { ActionIcon, Box, Stack } from '@mantine/core';
import { FunctionComponent } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { IconTrash } from '@tabler/icons-react';
import classes from './styles.module.scss';
import CartItemDescription from './CartItemDescription';
import { ImageWithFallback, PriceLabel, ScalingCard } from '@/UI';
import { useAppDispatch } from '@/shared/hooks';
import { removeFromCart, CartItem as CartItemDef } from '@/lib/features/cart/cartSlice';
import PriceHelper from '@/shared/helpers/priceHelper';
import { ItemExtraInfoCard } from '@/components';
import { CartItemContext } from './context/CartItemContext';

interface CartItemProps {
  cartItem: CartItemDef
}

const CartItem: FunctionComponent<CartItemProps> =
({ cartItem }) => {
  const { price, dish, discount, id } = cartItem.menuPosition;
  const { count } = cartItem;
  const priceWithDiscount = discount === 0 ?
  undefined
  :
  PriceHelper.getPriceWithDiscount(price, discount, count);
  const [opened, { open, close }] = useDisclosure(false);
  const dispatch = useAppDispatch();
  const removeItem = () => dispatch(removeFromCart(id));
  return (
    <CartItemContext.Provider value={cartItem}>
      <ScalingCard className={classes.cartItemContainer} p={0} mb="xs">
        <Box className={classes.image} onClick={open} data-modal-opened={opened}>
          <ImageWithFallback
            style={{ borderRadius: '10px' }}
            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE}/${dish.image?.path}`}
            alt="123"
            sizes="(max-width:62em) 80px, 120px"
            fill
          />
        </Box>
        <CartItemDescription />
        <Stack
          gap="xs"
          className={classes.priceBlock}
          justify="space-between"
          align="flex-end"
          pb={20}
        >
          <Stack
            gap="xs"
          >
            <PriceLabel
              fullPrice={price * count}
              priceWithDiscount={priceWithDiscount}
              classes={{
                mainPrice: classes.cartItemHeader,
                oldPrice: classes.cartItemDescription,
              }}
            />
          </Stack>

        <ActionIcon
          variant="transparent"
          className={classes.removeIcon}
          hiddenFrom="sm"
          onClick={removeItem}
        >
          <IconTrash stroke={1.5} size={24} />
        </ActionIcon>
        </Stack>
        <ItemExtraInfoCard
          menuPosition={cartItem.menuPosition}
          buttonText="Удалить из корзины"
          buttonAction={() => { removeItem(); close(); }}
          opened={opened}
          onClose={close}
        />
      </ScalingCard>
    </CartItemContext.Provider>
  );
};

export default CartItem;
