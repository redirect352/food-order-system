import { Button, Flex, Paper, Text, Title } from '@mantine/core';
import { FunctionComponent } from 'react';
import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import classes from './styles.module.scss';

interface MenuListItemProps {
  price: number,
  name: string,
  description: string,
  quantity: string,
  image: string | StaticImport
}

const MenuListItem: FunctionComponent<MenuListItemProps> =
  ({ price, quantity, name, description, image }) => (
    <Paper className={classes.menuItemBox} p="md">
      <Flex direction="column" align="center" justify="space-between" h="100%">
        <Flex direction="column" gap={8}>
          <Paper className={classes.imageBox} pos="relative" bg="dark">
            <Image
              className={classes.image}
              src={image}
              alt="123"
              fill
              />
          </Paper>
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
        <Flex justify="space-between" align="center" w="100%">
          <Text fw={500}>{price} руб.</Text>
          <Button variant="outline" size="xs">Добавить</Button>
        </Flex>
      </Flex>
    </Paper>
  );

export default MenuListItem;
