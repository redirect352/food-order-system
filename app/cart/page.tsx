'use client';

import { Group, Stack, Title, Text, Button } from '@mantine/core';
import { FunctionComponent } from 'react';
import classes from './styles.module.scss';
import { CartList } from '@/components';
import CartTotal from '@/components/CartTotal/CartTotal';
import { MobileScrollToAffix } from '@/UI';

interface CartProps {

}

const Cart : FunctionComponent<CartProps> = () => {
  const cartItems: Array<any> = [123, 123, 123, 123, 123, 213123];
  const cartCount = cartItems.length;
  return (
    <Group gap="xl" className={classes.cartCont}>
      <Stack className={classes.cartItemsContainer} gap="lg">
        <Group justify="space-between">
          <Title order={1}>Корзина <Text c="dimmed" span fz="h2">{cartCount}</Text></Title>
          <Button variant="white" size="lg" visibleFrom="sm">
            Выбрать всё
          </Button>
        </Group>
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
    </Group>
);
};

export default Cart;
