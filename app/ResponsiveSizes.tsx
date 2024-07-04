'use client';

import { ActionIcon, Affix, AppShell, Burger, Divider, Group, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Image from 'next/image';
import { IconShoppingBag } from '@tabler/icons-react';
import Link from 'next/link';
import { Sidebar } from '@/components';
import classes from './styles.module.scss';

function ResponsiveSizes({ children }: { children: any }) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: { base: 50, sm: 0, md: 0, lg: 0 } }}
      navbar={{
        width: { base: 200, md: 300, lg: 400 },
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
      className={classes.bodyColor}
    >
      <AppShell.Header hiddenFrom="sm">
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md" bg="light-dark(var(--mantine-color-grey-1), var(--mantine-color-black))">
        <AppShell.Section>
          <Group px="md">
            <Image src="/logo.png" alt="" width={37} height={52} />
            <Title order={3}>Cистема заказа питания</Title>
          </Group>
          <Divider my="md" pb="md" />
        </AppShell.Section>
        <AppShell.Section grow>
          <Sidebar />
        </AppShell.Section>
        <AppShell.Section>
          <Divider my="md" />
          <Text ta="center" size="sm" c="dimmed">© Государственное предприятие &quot;Минсктранс&quot;, 2024</Text>
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>
          {children}
          <Affix position={{ bottom: 10, right: 10 }} hiddenFrom="sm">
            <Link
              href="/cart">
              <ActionIcon size={60} radius="xl">
                <IconShoppingBag />
              </ActionIcon>
            </Link>
          </Affix>
      </AppShell.Main>
    </AppShell>
  );
}
export default ResponsiveSizes;
