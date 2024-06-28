import { FunctionComponent } from 'react';
import { MenuList, NoContentPage, PageHeaderContainer } from '@/components';
import noMenuImage from '@/public/204Menu.png';

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
        <MenuList />
      </PageHeaderContainer>
    }
  </>
);
};

export default Menu;
