import { FunctionComponent } from 'react';
import { NoContentPage } from '@/components';
import noMenuImage from '@/public/204Menu.png';

interface Props {

}

const Menu : FunctionComponent<Props> = () => (
  <>
    <NoContentPage
      buttonLabel="На главную"
      href="/"
      label="К сожалению меню временно отсутствует, попробуйте позже :("
      img={noMenuImage}
      />
  </>
);

export default Menu;
