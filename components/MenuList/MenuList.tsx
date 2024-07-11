import { Flex } from '@mantine/core';
import { FunctionComponent } from 'react';
import { menuItems } from '@/testData/menuData';
import MenuListItem from './MenuItem';
// import classes from './styles.module.scss';

interface MenuListProps {

}

const MenuList: FunctionComponent<MenuListProps> = () => (
  <Flex gap={16} wrap="wrap" align="center" justify="flex-start" h="100%">
    {menuItems.map(item => <MenuListItem dishDescription={item} key={item.id} />)}
  </Flex>
  );

export default MenuList;
