'use client';

import { Flex, Skeleton, Stack, Title } from '@mantine/core';
import { FunctionComponent } from 'react';
import { IconMoodEmpty } from '@tabler/icons-react';
import MenuListItem from './MenuItem';
import { useAppSelector } from '@/shared/hooks';
import { selectMenuItems } from '@/lib/features/menu/menuSlice';
import classes from './styles.module.scss';

interface MenuListProps {
  loading?: boolean
}

const MenuList: FunctionComponent<MenuListProps> = ({ loading }) => {
  const menuItems = useAppSelector(selectMenuItems);
  const loadedContent = menuItems.map(item => <MenuListItem menuPosition={item} key={item.id} />);
  return (
    <Flex
      gap={16}
      wrap="wrap"
      align="flex-start"
      justify="flex-start"
      w="100%"
      h="100%">
      {!loading && loadedContent}
      {
        !loading && menuItems.length === 0 &&
        <Stack w="100%" justify="center" ta="center">
          <div>
            <IconMoodEmpty size={100} />
          </div>
          <Title order={3}> Ничего не найдено...</Title>
        </Stack>
      }
      {
        loading &&
        [...Array(10)].map((item, index) =>
        (<Skeleton
          className={classes.menuItemBox}
          key={index}
        />
        ))
      }
    </Flex>
  );
};

export default MenuList;
