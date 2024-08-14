import { Group, Stack, Title, Text, Button } from '@mantine/core';
import { FunctionComponent } from 'react';
import classes from './styles.module.scss';
import { useAppSelector } from '@/shared/hooks';
import { selectCartItems, selectCartItemsIds, selectCartTotalCount } from '@/lib/features/cart/cartSlice';
import PriceHelper from '@/shared/helpers/priceHelper';
import { selectMenuItemsById } from '@/lib/features/menu/menuSlice';

interface CartTotalProps {

}

const CartTotal: FunctionComponent<CartTotalProps> = () => {
  const items = useAppSelector(selectCartItems);
  const itemsIds = useAppSelector(selectCartItemsIds);
  const menuItems = useAppSelector(state => selectMenuItemsById(state, itemsIds));
  const totalPrice = items.reduce((sum, item) =>
    sum + item.dishCount * (menuItems.find(dish => dish.id === item.dishId)?.price ?? 0), 0);
  const totalDiscount = items.reduce((sum, item) => {
    const dish = menuItems.find(dishItem => dishItem.id === item.dishId);
    if (!dish) return sum;
    return sum + PriceHelper.getDiscountValue(dish.price, dish.discount, item.dishCount);
  }, 0);
  const totalCount = useAppSelector(selectCartTotalCount);
  return (
  <Stack className={classes.cartTotalContainer} align="center" px="50px" gap="xs" pb="12px" pt="12px">
    <Group justify="space-between" w="100%">
      <Title className={classes.header}>Итого</Title>
      <Title className={classes.header}>{(totalPrice - totalDiscount).toFixed(2)} руб.</Title>
    </Group>
    <Group justify="space-between" w="100%">
      <Text className={classes.subheader}>{totalCount} позиций</Text>
      <Text className={classes.subheader}>{(totalPrice).toFixed(2)} руб.</Text>
    </Group>
    <Group justify="space-between" w="100%">
      <Text className={classes.subheader}>Скидка</Text>
      <Text className={classes.subheader}>−{(totalDiscount).toFixed(2)} руб.</Text>
    </Group>
    <Button className={classes.acceptButton} mt="lg">Оформить заказ</Button>
  </Stack>
);
};

export default CartTotal;
