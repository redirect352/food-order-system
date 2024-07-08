import { Group, Stack, Title, Text, Button } from '@mantine/core';
import { FunctionComponent } from 'react';
import classes from './styles.module.scss';

interface CartTotalProps {

}

const CartTotal: FunctionComponent<CartTotalProps> = () => {
  const totalPrice = 19.12;
  const totalDiscount = 3.12;
  const totalCount = 12;
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
