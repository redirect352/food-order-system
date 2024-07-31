import { FunctionComponent } from 'react';
import { AppShell, AppShellMain } from '@mantine/core';
import notFound2 from '@/public/404.png';
import { NoContentPage } from '@/components';
import classes from './(logged-in)/styles.module.scss';

interface Props {

}

const NotFound : FunctionComponent<Props> = () => (
  <AppShell>
    <AppShellMain className={classes.bodyColor}>
      <NoContentPage
        label="К сожалению данная страница не найдена"
        img={notFound2}
        buttonLabel="Вернуться на главную"
        href="/"
        />
    </AppShellMain>
  </AppShell>
);

export default NotFound;
