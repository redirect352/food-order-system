import { Flex, Title } from '@mantine/core';
import React, { FunctionComponent } from 'react';
import classes from './styles.module.scss';

interface PageHeaderContainerProps {
  title: string
}

const PageHeaderContainer: FunctionComponent<React.PropsWithChildren<PageHeaderContainerProps>> =
  ({ children, title }) => (
    <Flex direction="column" justify="flex-start" align="center" mih="calc(100dvh - var(--app-shell-header-offset, 0rem) - var(--app-shell-padding) - 0px)">
      <Flex className={classes.headerContainer}>
        <Title order={1} className={classes.pageHeader}>{title}</Title>
      </Flex>
      {children}
    </Flex>

);

export default PageHeaderContainer;
