'use client';

import { Box, Flex, Paper, Text, Title } from '@mantine/core';
import { FunctionComponent } from 'react';
import classes from './styles.module.scss';
import MenuItemAddButton from './MenuItemAddButton';
import MenuItemClickableImage from './MenuItemClickableImage';
import { MenuPositionDto } from '@/shared/types';
import { MenuListItemContext } from './MenuItemContext';

interface MenuListItemProps {
  menuPosition: MenuPositionDto
}

const MenuListItem: FunctionComponent<MenuListItemProps> = (props) => {
  const { quantity, name, description } = props.menuPosition.dish;
  return (
    <MenuListItemContext.Provider value={props.menuPosition}>
      <Paper className={classes.menuItemBox}>
        <Flex direction="column" align="center" justify="space-between" h="100%">
          <Flex direction="column" gap={8} maw="100%">
            <MenuItemClickableImage />
            <Flex align="flex-start" w="100%" direction="column" gap={8} pl={'md'} pr={'md'}>
              <Box w="100%">
                <Title order={3} lineClamp={2}>{name}</Title>
              </Box>
              <Flex gap={15} align="center" justify="space-between" w="100%">
                <Text flex="4 1 auto" c="dimmed" size="sm" lineClamp={2} ta="justify">
                  {description}
                </Text>
                <Text flex="4 1 auto" fw={500} size="sm" ta="center">{quantity}</Text>
              </Flex>
            </Flex>
          </Flex>
          <MenuItemAddButton />
        </Flex>
      </Paper>
    </MenuListItemContext.Provider>
  );
};
export default MenuListItem;
