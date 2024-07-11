import { FunctionComponent } from 'react';
import { Stack } from '@mantine/core';
// import classes from './styles.module.scss';
import { OrderCard } from '@/components';

interface CartProps {

}

const ActiveOrders : FunctionComponent<CartProps> = () => {
  const orders: Array<any> = [123, 32, 123];
  return (
    <Stack gap="xl" align="center">
      {orders.map(id => <OrderCard orderId={id} key={id} />)}
    </Stack>
  );
};

export default ActiveOrders;
