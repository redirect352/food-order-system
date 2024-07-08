'use client';

import { Stack, Group, ActionIcon, Text } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { FunctionComponent, useState } from 'react';
import { CountInput } from '@/UI';
import classes from './styles.module.scss';

interface CartItemDescriptionProps {
  price: number,
  name: string,
  description: string,
  quantity: string,
  discount : number,
  startCount: number
}

const CartItemDescription: FunctionComponent<CartItemDescriptionProps> =
({ price, name, discount, startCount, quantity, description }) => {
  const [count, changeCount] = useState(startCount);
  return (
    <>
    {/* mobile */}
    <Stack align="flex-start" gap={3} className={classes.centralSegment} hiddenFrom="sm">
        {
          discount === 0 ?
          <Text className={classes.cartItemHeader}>{price} руб.</Text>
          :
          <Group gap={0} align="flex-end">
          <Text className={classes.cartItemHeader} c="var(--mantine-color-discount)">
            {((price * (100 - discount)) / 100).toFixed(2)} руб.
          </Text>
          <Text span className={classes.cartItemDescription} td="line-through" lh="xs">
              {price} руб.
          </Text>
          </Group>
        }

        <Text fz="md">
          {name}
        </Text>
        <Text className={classes.cartItemDescription} lineClamp={2}>{description}</Text>
        <Text className={classes.cartItemDescription}>{quantity}</Text>
        <Group>
          <CountInput count={count} changeCount={changeCount} />
          <ActionIcon variant="transparent" className={classes.removeIcon}>
            <IconTrash stroke={1} />
          </ActionIcon>
        </Group>
    </Stack>
    {/* desktop */}
    <Stack align="flex-start" gap="xs" className={classes.centralSegment} visibleFrom="sm">
      <Text className={classes.cartItemHeader}>{name}</Text>
      <Text className={classes.cartItemDescription} lineClamp={2}>{description}</Text>
      <Text className={classes.cartItemDescription}>{quantity}</Text>
      <Group>
        <CountInput count={count} changeCount={changeCount} />
        <ActionIcon variant="transparent" className={classes.removeIcon}>
          <IconTrash stroke={1} />
        </ActionIcon>
      </Group>
    </Stack>
    </>
  );
};

export default CartItemDescription;
