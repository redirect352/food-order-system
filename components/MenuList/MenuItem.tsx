import { Flex, Indicator, Paper, Text, Title } from '@mantine/core';
import { FunctionComponent } from 'react';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import classes from './styles.module.scss';
import MenuItemAddButton from './MenuItemAddButton';
import { ImageWithFallback } from '@/UI';

interface MenuListItemProps {
  price: number,
  name: string,
  description: string,
  quantity: string,
  image: string | StaticImport,
  discount : number
}

const MenuListItem: FunctionComponent<MenuListItemProps> =
  ({ price, quantity, name, description, image, discount }) => (
      <Paper className={classes.menuItemBox} p="md">
        <Flex direction="column" align="center" justify="space-between" h="100%">
          <Flex direction="column" gap={8}>
            <Indicator label={`-${discount}%`} size={24} offset={12} position="top-end" inline disabled={discount === 0}>
              <Paper className={classes.imageBox} pos="relative">
                <ImageWithFallback
                  className={classes.image}
                  src={image}
                  alt="123"
                  fill
                  />
              </Paper>
            </Indicator>
            <Flex align="flex-start" w="100%" direction="column" gap={8}>
              <Title order={4}>{name}</Title>
              <Flex gap={15} align="center">
                <Text flex="4 1 auto" c="dimmed" size="xs" lineClamp={3} ta="justify">
                  {description}
                </Text>
                <Text flex="4 1 auto" fw={500} size="xs" ta="center">{quantity}</Text>
              </Flex>
            </Flex>
          </Flex>
          <MenuItemAddButton price={price} discount={discount} />
        </Flex>
      </Paper>
  );
export default MenuListItem;
