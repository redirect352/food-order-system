import { Group, Stack, Title, Text, Button } from '@mantine/core';
import { FunctionComponent } from 'react';
import classes from './styles.module.scss';
import { useAppSelector } from '@/shared/hooks';
import { selectCartTotalCount, selectFinalPrice, selectFullPrice, selectTotalDiscount } from '@/lib/features/cart/cartSlice';

interface CartTotalProps {

}

const CartTotal: FunctionComponent<CartTotalProps> = () => {
  const fullPrice = useAppSelector(selectFullPrice);
  const totalCount = useAppSelector(selectCartTotalCount);
  const totalDiscount = useAppSelector(selectTotalDiscount);
  const finalPrice = useAppSelector(selectFinalPrice);
  return (
    <Stack className={classes.cartTotalContainer} align="center" px="50px" gap="xs" pb="12px" pt="12px">
      <Group justify="space-between" w="100%">
        <Title className={classes.header}>Итого</Title>
        <Title className={classes.header}>
          {`${(finalPrice).toFixed(2)} ${(fullPrice - totalDiscount).toFixed(2)}`} руб.
        </Title>
      </Group>
      <Group justify="space-between" w="100%">
        <Text className={classes.subheader}>{totalCount} позиций</Text>
        <Text className={classes.subheader}>{(fullPrice).toFixed(2)} руб.</Text>
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
