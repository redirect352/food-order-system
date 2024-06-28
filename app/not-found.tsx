import { FunctionComponent } from 'react';
import notFound2 from '@/public/404.png';
import { NoContentPage } from '@/components';

interface Props {

}

const NotFound : FunctionComponent<Props> = () => (
  <NoContentPage
    label="К сожалению данная страница не найдена"
    img={notFound2}
    buttonLabel="Вернуться в меню"
    href="/"
    />
  );

export default NotFound;
