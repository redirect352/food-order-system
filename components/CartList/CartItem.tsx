'use client';

import { ActionIcon, Box, Flex, Stack } from '@mantine/core';
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
import { ImageHelper } from '../../shared/helpers';

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
  const mainImage = dish.images?.at(0);
  const src = ImageHelper.getImageSrc(mainImage);
  return (
    <>
    <CartItemContext.Provider value={cartItem}>
      <ScalingCard className={classes.cartItemContainer} onClick={open} animationType='up'>
        <Box className={classes.image} data-modal-opened={opened}>
          <ImageWithFallback
            style={{ borderRadius: '10px' }}
            src={src}
            alt=""
            sizes="(max-width:62em) 200px, 180px"
            fill
          />
        </Box>
        <CartItemDescription />
        <Flex className={classes.priceBlock}>
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
            onClick={(e) => {e.stopPropagation();removeItem();}}
          >
            <IconTrash stroke={1.5} size={24} />
          </ActionIcon>
        </Flex>
      </ScalingCard>
    </CartItemContext.Provider>
      <ItemExtraInfoCard
        menuPosition={cartItem.menuPosition}
        buttonText="Удалить из корзины"
        buttonAction={() => { removeItem(); close(); }}
        opened={opened}
        onClose={close}
        cartOptionsEnabled
      />
    </>
  );
};

export default CartItem;
