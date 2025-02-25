import { ActionIcon, Affix } from '@mantine/core';
import { IconShoppingBag } from '@tabler/icons-react';
import Link from 'next/link';
import moment from 'moment';
import { PageHeaderContainer } from '@/components';

export const revalidate = 3600;
export default  function MenuLayout(props: { children: any}) {
  return (
    <PageHeaderContainer title={`Меню на ${moment().format('DD.MM.yyyy')}`}>
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
