import { Flex } from '@mantine/core';
import { FunctionComponent } from 'react';
import classes from './styles.module.scss';
import MenuItem from './MenuItem';
import img from '@/testData/foodImage.jpg';

interface MenuListProps {

}
const defProps = {
  price: 1.76,
  image: img,
  name: 'Борщ холодный',
  description: 'свекла маринованная, сметана, огурцы свежие, лук зеленый, яйцо, сахар песок',
  quantity: '250/20',
};

const MenuList: FunctionComponent<MenuListProps> = () => (
  <Flex gap={16} wrap="wrap" align="center" justify="center">
    <MenuItem {...defProps} />
    <MenuItem {...defProps} />
    <MenuItem {...defProps} />
    <MenuItem {...defProps} />
    <MenuItem {...defProps} />
  </Flex>
  );

export default MenuList;
