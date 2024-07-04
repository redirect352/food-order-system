import { FunctionComponent } from 'react';
import { MenuFilterBar, MenuList, NoContentPage, PageHeaderContainer } from '@/components';
import noMenuImage from '@/public/204Menu.png';
import { Flex } from '@mantine/core';

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
      <PageHeaderContainer title="Меню на 28.06.2024">
        <Flex direction="column" gap={24}>
          <MenuFilterBar />
          <MenuList />
        </Flex>
      </PageHeaderContainer>
    }
  </>
);
};

export default Menu;
