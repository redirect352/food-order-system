import { Stack } from '@mantine/core';
import { FunctionComponent } from 'react';
import CartItem from './CartItem';
import img from '@/testData/foodImage.jpg';

interface CartListProps {

}

const defProps = {
  dish: {
    price: 1.76,
    image: img,
    name: 'Борщ холодный',
    description: 'свекла маринованная, сметана, огурцы свежие, лук зеленый, яйцо, сахар песок',
    quantity: '250/20',
    discount: 0,
    calorieContent: 350,
    producerName: 'Столовая ТП-6',
  },
  startCount: 1,
};

const CartList: FunctionComponent<CartListProps> = () => (
  <Stack>
    <CartItem {...defProps} />
    <CartItem {...defProps} />
    <CartItem {...defProps} />
    <CartItem {...defProps} />
    <CartItem {...defProps} />
    <CartItem {...defProps} />
    <CartItem {...defProps} />
    <CartItem {...defProps} />
    <CartItem {...defProps} />

  </Stack>
  );

export default CartList;
