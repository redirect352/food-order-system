import { ActionIcon, Affix } from '@mantine/core';
import { IconShoppingBag } from '@tabler/icons-react';
import Link from 'next/link';
import { PageHeaderContainer } from '@/components';

export default function MenuLayout({ children }: { children: any }) {
  return (
    <PageHeaderContainer title="Меню на 28.06.2024">
      {children}
      <Affix position={{ bottom: 10, right: 10 }} hiddenFrom="sm" zIndex={95}>
        <Link
          href="/cart">
          <ActionIcon size={60} radius="xl">
            <IconShoppingBag />
          </ActionIcon>
        </Link>
      </Affix>
    </PageHeaderContainer>
  );
}
