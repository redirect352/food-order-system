'use client';

import { Group, Stack, Title, Text, Button, Affix, Transition } from '@mantine/core';
import { FunctionComponent } from 'react';
import { IconArrowDown } from '@tabler/icons-react';
import { useWindowScroll } from '@mantine/hooks';
import classes from './styles.module.scss';
import { CartList } from '@/components';
import CartTotal from '@/components/CartTotal/CartTotal';

interface CartProps {

}

const Cart : FunctionComponent<CartProps> = () => {
  const [scroll, scrollTo] = useWindowScroll();
  const cartItems: Array<any> = [123, 123, 123, 123, 123, 213123];
  const cartCount = cartItems.length;
  return (
    <Group gap="xl">
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
      <Affix position={{ bottom: 10, right: 10 }} hiddenFrom="sm" zIndex={95}>
        <Transition transition="slide-left" duration={400} mounted={scroll.y < (document.body.scrollHeight - window.screen.height - 400)}>
        {
          (transitionStyles) => (
          <Button
            onClick={() => scrollTo({ y: document.body.clientHeight })}
            rightSection={<IconArrowDown size={14} />}
            style={{...transitionStyles}}
          >
            К оформлению заказа
          </Button>)
          }
        </Transition>
      </Affix>
    </Group>
);
};

export default Cart;
