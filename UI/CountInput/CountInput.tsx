'use client';

import { ActionIcon, Flex, Text } from '@mantine/core';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import { FunctionComponent } from 'react';

interface CountInputProps {
  count: number,
  changeCount: (c : number) => void,
  countLabel?: 'шт.' | 'ед.' | string
}

const CountInput: FunctionComponent<CountInputProps> =
({ count, changeCount, countLabel = 'шт.' }) => (
    <>
      <Flex justify="flex-end" align="center" visibleFrom="md">
        <ActionIcon size={32} variant="transparent" onClick={() => changeCount(count - 1)}>
          <IconMinus />
        </ActionIcon>
        <Text fw={500}>{count} {countLabel}</Text>
        <ActionIcon size={32} variant="transparent" onClick={() => changeCount(count + 1)}>
          <IconPlus />
        </ActionIcon>
      </Flex>

      <Flex justify="flex-end" align="center" hiddenFrom="md">
        <ActionIcon size={24} variant="transparent" onClick={() => changeCount(count - 1)}>
          <IconMinus stroke={2} />
        </ActionIcon>
        <Text fw={500} fz="xs">{count} {countLabel}</Text>
        <ActionIcon size={24} variant="transparent" onClick={() => changeCount(count + 1)}>
          <IconPlus stroke={2} />
        </ActionIcon>
      </Flex>
    </>
  );

export default CountInput;
