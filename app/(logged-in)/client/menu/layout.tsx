import { ActionIcon, Affix } from '@mantine/core';
import { IconShoppingBag } from '@tabler/icons-react';
import Link from 'next/link';
import { PageHeaderContainer } from '@/components';
import { DateTitle } from './title';
import classes from './styles.module.scss';

export const revalidate = 3600;
export default  function MenuLayout(props: { children: any}) {
  return (
    <PageHeaderContainer title={ <DateTitle />} styles={{headerContainer:classes.headerContainer}}>
      {props.children}
      <Affix position={{ bottom: 10, right: 10 }} hiddenFrom="sm" zIndex={95}>
        <Link
          href="cart">
          <ActionIcon size={60} radius="xl">
            <IconShoppingBag />
          </ActionIcon>
        </Link>
      </Affix>
    </PageHeaderContainer>
  );
}
