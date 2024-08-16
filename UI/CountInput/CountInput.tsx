'use client';

import { ActionIcon, Flex, Text, TextProps } from '@mantine/core';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import { FunctionComponent } from 'react';

interface CountInputProps {
  count: number,
  changeCount: (c : number) => void,
  countLabel?: 'шт.' | 'ед.' | string,
  size?: number,
  labelProps?: TextProps,
}

const CountInput: FunctionComponent<CountInputProps> =
({ count, changeCount, countLabel = 'шт.', size = 24, labelProps }) => (
    <>
      <Flex justify="flex-end" align="center" visibleFrom="md">
        <ActionIcon size={size} variant="transparent" onClick={() => changeCount(count - 1)}>
          <IconMinus size={size} />
        </ActionIcon>
        <Text fw={500} {...labelProps}>{count} {countLabel}</Text>
        <ActionIcon size={size} variant="transparent" onClick={() => changeCount(count + 1)}>
          <IconPlus size={size} />
        </ActionIcon>
      </Flex>

      <Flex justify="flex-end" align="center" hiddenFrom="md">
        <ActionIcon size={size} variant="transparent" onClick={() => changeCount(count - 1)}>
          <IconMinus stroke={2} size={size} />
        </ActionIcon>
        <Text fw={500} {...labelProps}>{count} {countLabel}</Text>
        <ActionIcon size={size} variant="transparent" onClick={() => changeCount(count + 1)}>
          <IconPlus stroke={2} size={size} />
        </ActionIcon>
      </Flex>
    </>
  );

export default CountInput;
