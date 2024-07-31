import { FunctionComponent } from 'react';
import { Flex, Stack } from '@mantine/core';
import { MenuFilterBar, MenuList, NoContentPage } from '@/components';
import noMenuImage from '@/public/204Menu.png';
import classes from './styles.module.scss';
import { Pagination } from '@/UI';

interface MenuProps {

}

const Menu : FunctionComponent<MenuProps> = () => {
  const menuItemsData: Array<any> = [123];
  return (
  <>
    {
      menuItemsData.length === 0
      ?
        <NoContentPage
          buttonLabel="На главную"
          href="/"
          label="К сожалению меню временно отсутствует, попробуйте позже :("
          img={noMenuImage}
        />
      :
        <Stack className={classes.menuContainer} gap={24} align="center" pb="md">
          <MenuFilterBar />
          <MenuList />
          <Flex w="100%" justify="flex-end" align="flex-end" flex="1 1 auto">
            <Pagination total={10} boundaries={0} gap={4} size="sm" />
          </Flex>
        </Stack>
    }
  </>
);
};

export default Menu;
