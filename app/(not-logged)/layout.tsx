import { AppShell, AppShellFooter, AppShellHeader, AppShellMain, Flex, Group, rem, Text, Title } from '@mantine/core';
import Image from 'next/image';
import React from 'react';
import classes from './styles.module.scss';

export default function LoginLayout({ children }: { children: any }) {
  return (
    <AppShell header={{ height: 80 }} padding="md">
      <AppShellHeader>
        <Group h="100%" p="md" ml="lg">
          <Image src="/logo.png" alt="" width={37} height={52} />
          <Title order={3}>Cистема заказа питания</Title>
        </Group>
      </AppShellHeader>
      <AppShellMain
        pt={`calc(${rem(80)} + var(--mantine-spacing-md))`}
        className={classes.mainBg}
      >
        <Flex
          align="center"
          justify="center"
          mt="xl"
        >
          {children}
        </Flex>
      </AppShellMain>
      <AppShellFooter p="md">
        <Text ta="center" size="sm" c="dimmed">
          © Государственное предприятие &quot;Минсктранс&quot;, 2024
        </Text>
      </AppShellFooter>
    </AppShell>
  );
}
