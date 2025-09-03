import { AppShell, AppShellFooter, AppShellHeader, AppShellMain, Box, Flex, Group, NavLink, rem, Text, Title } from '@mantine/core';
import Image from 'next/image';
import React, { Suspense } from 'react';
import Link from 'next/link';
import classes from './styles.module.scss';
import logo from '@/public/logo.png';
import logo2 from '@/app/icon.png';

export default function LoginLayout({ children }: { children: any }) {
  return (
    <AppShell header={{ height: 80 }} padding="md">
      <AppShellHeader>
       <Link href="/" style={{ textDecoration: 'none', color:'inherit' }}>
          <Group h="100%" ml="lg">
            {/* <Image src={logo} alt="" width={37} height={52} /> */}
            <Image src={logo2} alt="" width={40} height={40} />
            <Title visibleFrom="sm" order={3} pt={7}>Заказ питания</Title>
            <Title hiddenFrom="sm" order={3} pt={7}>Заказ питания</Title>
          </Group>
       </Link>
      </AppShellHeader>
      <AppShellMain
        pt={`calc(${rem(80)} + var(--mantine-spacing-md))`}
        className={classes.mainBg}
      >
        <Suspense>
          <Box className={classes.formBox}>
            {children}
          </Box>
          <div className={classes.overlay}></div>
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
