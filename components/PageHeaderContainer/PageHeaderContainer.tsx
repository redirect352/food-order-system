import { Stack, Text, Title } from '@mantine/core';
import React, { FunctionComponent } from 'react';
import classes from './styles.module.scss';

interface PageHeaderContainerProps {
  title: string,
  subtitle?: string
}

const PageHeaderContainer: FunctionComponent<React.PropsWithChildren<PageHeaderContainerProps>> =
  ({ children, title, subtitle }) => (
    <Stack
      justify="flex-start"
      align="center"
      mih="calc(100dvh - var(--app-shell-header-offset, 0rem) - var(--app-shell-padding) - 0px)"
      >
      <Stack className={classes.headerContainer} gap="xs">
        <Title order={1} className={classes.pageHeader} ta="center">{title}</Title>
        {subtitle && <Text c="dimmed" ta="center">{subtitle}</Text>}
      </Stack>
      {children}
    </Stack>

);

export default PageHeaderContainer;
