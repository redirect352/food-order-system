'use client';

import { AppShell, Burger, Divider, Group, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Image from 'next/image';
import { Sidebar, UserAvatar } from '@/components';
import logo2 from '@/app/icon.png';
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
      <AppShell.Header className={classes.header}>
        <Group align="center" justify="space-between" h="100%">
          <Group px="md" visibleFrom="sm" pl="lg" align='center'>
              {/* <Image src={logo} alt="" width={37} height={52} /> */}
              <Image src={logo2} alt="" width={40} height={40} />
              <Title order={3} pt={7}>Заказ питания</Title>
          </Group>
          <UserAvatar px="md" visibleFrom="sm" pl="lg" />
          <Group h="100%" px="md" hiddenFrom="sm">
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar className={classes.navbar}>
        <AppShell.Section>
          {/* <Divider my="md" pb="md" /> */}
        </AppShell.Section>
        <AppShell.Section grow>
          <Sidebar />
        </AppShell.Section>
        <AppShell.Section>
          <Divider my="md" />
          <Text className={classes.bottomText}>
            © Государственное предприятие &quot;Минсктранс&quot;, 2024
          </Text>
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main className={className}>
        {children}
      </AppShell.Main>
    </AppShell>
  );
}
export default ResponsiveSizes;
