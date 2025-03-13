'use client';

import { Box, Flex, Skeleton, Stack, Title } from '@mantine/core';
import { FunctionComponent } from 'react';
import { IconMoodEmpty } from '@tabler/icons-react';
import MenuListItem from './MenuItem';
import { useAppSelector } from '@/shared/hooks';
import { selectMenuItems } from '@/lib/features/menu/menuSlice';
import classes from './styles.module.scss';
import { selectDeliveryDestination } from '../../lib/features/cart/cartSlice';
import { ImageWithFallback } from '../../UI';
import noMenuImage from '@/public/204Menu.png';
import noMenuImage2 from '@/public/dog-cartoon.png';

interface MenuListProps {
  loading?: boolean
}

const MenuList: FunctionComponent<MenuListProps> = ({ loading }) => {
  const menuItems = useAppSelector(selectMenuItems);
  const destination = useAppSelector(selectDeliveryDestination);
  const loadedContent = menuItems.map(item => <MenuListItem menuPosition={item} key={item.id} />);
  return (
    <Flex
      gap={16}
      wrap="wrap"
      align="flex-start"
      justify="flex-start"
      w="100%"
      h="100%"
    >
      {!loading && loadedContent}
      {
        !loading && menuItems.length === 0 &&
        <Stack w="100%" justify="center" align='center'>
          <Box className={classes.noItemsImageBox}>
            <ImageWithFallback
              sizes="(max-width: 460px) 300px 300px, (max-width: 564px) 400px 400px, (min-width: 565px) 500px 500px"
              src={destination === null ? noMenuImage2 : noMenuImage}
              alt="menu is empty"
              fill
              priority
            />
          </Box>
          <Title order={3}> 
            {!!destination && <>Для указанного места доставки меню отсутствует</>}
            {!destination && <>Выберите место доставки</>}
          </Title>
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
