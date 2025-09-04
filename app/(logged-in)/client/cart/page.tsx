'use client';

import { Group, Stack, Title, Text, Button, Flex } from '@mantine/core';
import { FunctionComponent } from 'react';
import classes from './styles.module.scss';
import { CartList, NoContentPage } from '@/components';
import CartTotal from '@/components/CartTotal/CartTotal';
import { MobileScrollToAffix } from '@/UI';
import { useAppSelector } from '@/shared/hooks';
import { selectCartItemsLength, selectDeliveryDestination } from '@/lib/features/cart/cartSlice';
import noMenuImage from '@/public/emptyCart.png';

interface CartProps {

}

const Cart : FunctionComponent<CartProps> = () => {
  const cartCount = useAppSelector(selectCartItemsLength);
  const deliveryDestination = useAppSelector(selectDeliveryDestination);
  return (
    <>
      {
        cartCount !== 0 &&
        <Flex
          className={classes.cartContainer}
        >
          <Stack className={classes.cartItemsContainer}>
            <Stack gap={0}>
              <Group justify="space-between">
                <Title order={1}>Корзина <Text c="dimmed" span fz="h2">{cartCount}</Text></Title>
                <Button variant="transparent" size="lg" visibleFrom="sm">
                  Выбрать всё
                </Button>
              </Group>
              <Group>
                <span className={classes.destinationLabel}>Место доставки:</span>
                <span className={classes.destinationValue}>
                  {deliveryDestination?.name?? '<Не установлено>'}
                </span>
              </Group>
            </Stack>
            <CartList />
          </Stack>
          <Stack className={classes.cartTotal}>
            <CartTotal />
          </Stack>
          <MobileScrollToAffix
            buttonLabel="К оформлению заказа"
            scrollDirection="bottom"
            position={{ right: 10, bottom: 10 }}
          />
        </Flex>
        }
        {
          cartCount === 0 &&
          <NoContentPage
            buttonLabel="В меню"
            href="menu"
            label="Ваша Корзина пуста. Выберите блюда для заказа в меню "
            img={noMenuImage}
          />
        }
    </>
);
};

export default Cart;
