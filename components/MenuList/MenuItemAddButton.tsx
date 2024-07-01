'use client';

import { ActionIcon, Button, Flex, Text } from '@mantine/core';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import { FunctionComponent, useState } from 'react';

interface MenuItemAddButtonProps {
  price: number,
  discount: number
}

const MenuItemAddButton: FunctionComponent<MenuItemAddButtonProps> = ({ price, discount }) => {
  const color = discount === 0 ? '' : 'var(--mantine-color-discount)';
  const finalPrice = +(price * ((100 - discount) / 100)).toFixed(2);
  const [count, changeCount] = useState(0);
  return (
    <Flex justify="space-between" align="center" w="100%">
      {
      count > 0
      ?
      <>
        <Text fw={500}>
          {(finalPrice * count).toFixed(2)}
          <Text span fz={14}> руб.</Text>
        </Text>
        <Flex justify="flex-end" align="center">
          <ActionIcon size={32} variant="transparent" onClick={() => changeCount(count - 1)}>
            <IconMinus />
          </ActionIcon>
          <Text fw={500}>{count} шт.</Text>
          <ActionIcon size={32} variant="transparent" onClick={() => changeCount(count + 1)}>
            <IconPlus />
          </ActionIcon>
        </Flex>
      </>
      :
      <>
        <Flex align="flex-end" gap={4}>
        <Text fw={500} c={color}>{finalPrice} <Text span fz={14} c={color}> руб.</Text></Text>
        {discount !== 0 && <Text c="dimmed" size="xs" td="line-through">{price} руб.</Text>}
        </Flex>
        <Button variant="outline" size="xs" onClick={() => changeCount(1)}>Добавить</Button>
      </>
      }
    </Flex>
  );
};

export default MenuItemAddButton;
