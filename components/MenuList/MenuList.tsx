import { Flex } from '@mantine/core';
import { FunctionComponent } from 'react';
import MenuItem from './MenuItem';
import img from '@/testData/foodImage.jpg';
// import classes from './styles.module.scss';

interface MenuListProps {

}
const defProps = {
  price: 1.76,
  image: img,
  name: 'Борщ холодный',
  description: 'свекла маринованная, сметана, огурцы свежие, лук зеленый, яйцо, сахар песок',
  quantity: '250/20',
  discount: 0,
};

const MenuList: FunctionComponent<MenuListProps> = () => (
  <Flex gap={16} wrap="wrap" align="center" justify="center">
    <MenuItem {...defProps} discount={30} />
    <MenuItem {...defProps} />
    <MenuItem {...defProps} />
    <MenuItem {...defProps} discount={10} />
    <MenuItem {...defProps} />
     <MenuItem {...defProps} discount={20} />
    <MenuItem {...defProps} />
    <MenuItem {...defProps} discount={10} />
    <MenuItem {...defProps} />
    <MenuItem {...defProps} />
     <MenuItem {...defProps} discount={10} />
    <MenuItem {...defProps} />
    <MenuItem {...defProps} />
    <MenuItem {...defProps} />
    <MenuItem {...defProps} />
     <MenuItem {...defProps} discount={30} />
    <MenuItem {...defProps} />
    <MenuItem {...defProps} />
    <MenuItem {...defProps} />
    <MenuItem {...defProps} />
  </Flex>
  );

export default MenuList;
