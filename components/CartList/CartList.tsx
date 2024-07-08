import { Stack } from '@mantine/core';
import { FunctionComponent } from 'react';
import CartItem from './CartItem';
import img from '@/testData/foodImage.jpg';

interface CartListProps {

}

const defProps = {
  price: 1.76,
  image: img,
  name: 'Борщ холодный',
  description: 'свекла маринованная, сметана, огурцы свежие, лук зеленый, яйцо, сахар песок, сахар песок, сахар песок, сахар песок, сахар песок, сахар песок, сахар песок, сахар песок, сахар песок',
  quantity: '250/20',
  discount: 0,
  startCount: 1,
};

const CartList: FunctionComponent<CartListProps> = () => (
  <Stack>
    <CartItem {...defProps} discount={30} />
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
