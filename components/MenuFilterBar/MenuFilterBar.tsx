'use client';

import { ActionIcon, Affix, CloseButton, Flex, Title, useMantineTheme } from '@mantine/core';
import { FunctionComponent, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { IconFilter } from '@tabler/icons-react';
import { Select } from '@/UI';
import classes from './styles.module.scss';
import FilterModal from '@/components/MenuFilterBar/FilterModal/FilterModal';

interface MenuFilterBarProps {

}
const cathegorySelectOptions = ['Продукция собственного производства', 'Готовая продукция'];
const subcathegorySelectOptions = ['Первые блюда', 'Вторые блюда', 'Третие блюда', 'Холодные закуски', 'Гарнир', 'Сладкие блюда'];

const MenuFilterBar: FunctionComponent<MenuFilterBarProps> = () => {
  const [cathegoryValue, changeCathegory] = useState<string | null>(null);
  const [subcathegoryValue, changeSubcathegory] = useState<string | null>(null);
  const resetFilters = () => {
    changeCathegory(null);
    changeSubcathegory(null);
  };
  const [opened, { open, close }] = useDisclosure(false);
  const theme = useMantineTheme();

  return (
    <Flex w="100%" justify="center">
      <Flex className={classes.filterBarContainer} gap={24} justify="flex-end" align="center">
        <Flex direction="column" gap={8}>
          <Title order={4}>Тип продукции</Title>
          <Select
            data={cathegorySelectOptions}
            value={cathegoryValue}
            onChange={e => changeCathegory(e)}
          />
        </Flex>
        <Flex direction="column" gap={8}>
          <Title order={4}>Тип блюда</Title>
          <Select
            data={subcathegorySelectOptions}
            value={subcathegoryValue}
            onChange={e => changeSubcathegory(e)}
          />
        </Flex>
        <Flex direction="column" gap={8}>
          <Title order={4} className={classes.resetButtonHeader}>ы</Title>
          <CloseButton
            disabled={cathegoryValue === null && subcathegoryValue === null}
            onClick={resetFilters}
            className={classes.resetButton}
          />
        </Flex>
      </Flex>
      <FilterModal
        opened={opened}
        onClose={close}
        title="Фильтры"
      />
      <Affix position={{ top: 10, right: theme.spacing.md }} hiddenFrom="sm" hidden={opened}>
        <ActionIcon onClick={open} hiddenFrom="sm" radius="xl" variant="transparent" size={25}>
          <IconFilter />
        </ActionIcon>
      </Affix>
    </Flex>
  );
};

export default MenuFilterBar;
