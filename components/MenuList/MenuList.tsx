import { Flex } from '@mantine/core';
import { FunctionComponent } from 'react';
import MenuItem from './MenuItem';
import img from '@/testData/foodImage.jpg';
import { Dish } from '@/shared/types';
// import classes from './styles.module.scss';

interface MenuListProps {

}
const defDish: Dish = {
  price: 1.76,
  image: img,
  name: 'Борщ холодный',
  description: 'свекла маринованная, сметана, огурцы свежие, лук зеленый, яйцо, сахар песок',
  quantity: '250/20',
  discount: 0,
  calorieContent: 350,
  producerName: 'Столовая ТП-6',
};

const MenuList: FunctionComponent<MenuListProps> = () => (
  <Flex gap={16} wrap="wrap" align="center" justify="flex-start" h="100%">
    <MenuItem dishDescription={{ ...defDish, discount: 30 }} />
    <MenuItem dishDescription={{ ...defDish, discount: 25 }} />
    <MenuItem dishDescription={defDish} />
    <MenuItem dishDescription={defDish} />
    <MenuItem dishDescription={defDish} />
    <MenuItem dishDescription={defDish} />
    <MenuItem dishDescription={defDish} />
    <MenuItem dishDescription={defDish} />
    <MenuItem dishDescription={defDish} />
    <MenuItem dishDescription={defDish} />
    <MenuItem dishDescription={defDish} />
    <MenuItem dishDescription={defDish} />
    <MenuItem dishDescription={defDish} />
    <MenuItem dishDescription={defDish} />
    <MenuItem dishDescription={defDish} />
  </Flex>
  );

export default MenuList;
