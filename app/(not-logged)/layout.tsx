import { AppShell, AppShellFooter, AppShellHeader, AppShellMain, Flex, Group, NavLink, rem, Text, Title } from '@mantine/core';
import Image from 'next/image';
import React, { Suspense } from 'react';
import Link from 'next/link';
import classes from './styles.module.scss';

export default function LoginLayout({ children }: { children: any }) {
  return (
    <AppShell header={{ height: 80 }} padding="md">
      <AppShellHeader>
       <Link href="/" style={{ textDecoration: 'none', color: 'black' }}>
          <Group h="100%" p="md" ml="lg">
            <Image src="/logo.png" alt="" width={37} height={52} />
            <Title visibleFrom="sm" order={3}>Система заказа питания</Title>
            <Title hiddenFrom="sm" order={5}>Система заказа питания</Title>
          </Group>
       </Link>
      </AppShellHeader>
      <AppShellMain
        pt={`calc(${rem(80)} + var(--mantine-spacing-md))`}
        className={classes.mainBg}
      >
        <Suspense>
          <Flex
            align="center"
            justify="center"
            mt="xl"
          >
            {children}
          </Flex>
        </Suspense>
      </AppShellMain>
      <AppShellFooter p="md">
        <Text ta="center" size="sm" c="dimmed">
          © Государственное предприятие &quot;Минсктранс&quot;, 2024
        </Text>
      </AppShellFooter>
    </AppShell>
  );
}
