'use client';

import { AppShell, Burger, Divider, Group, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Image from 'next/image';
import { Sidebar, UserAvatar } from '@/components';
import classes from './styles.module.scss';

function ResponsiveSizes({ children, className }: { children: any, className?: string }) {
  const [opened, { toggle }] = useDisclosure();
  return (
    <AppShell
      header={{ height: { base: 50, sm: 70, md: 70, lg: 70 } }}
      navbar={{
        width: { base: 200, md: 300, lg: 400 },
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
      className={classes.bodyColor}
    >
      <AppShell.Header bg="light-dark(var(--mantine-color-grey-1), var(--mantine-color-black))">
        <Group align="center" justify="space-between" h="100%">
          <Group px="md" visibleFrom="sm" pl="lg">
              <Image src="/logo.png" alt="" width={37} height={52} />
              <Title order={3}>Cистема заказа питания</Title>
          </Group>
          <UserAvatar px="md" visibleFrom="sm" pl="lg" />
          <Group h="100%" px="md" hiddenFrom="sm">
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md" bg="light-dark(var(--mantine-color-grey-1), var(--mantine-color-black))">
        <AppShell.Section>
          {/* <Divider my="md" pb="md" /> */}
        </AppShell.Section>
        <AppShell.Section grow>
          <Sidebar />
        </AppShell.Section>
        <AppShell.Section>
          <Divider my="md" />
          <Text ta="center" size="sm" c="dimmed">© Государственное предприятие &quot;Минсктранс&quot;, 2024</Text>
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main className={className}>
        {children}
      </AppShell.Main>
    </AppShell>
  );
}
export default ResponsiveSizes;
