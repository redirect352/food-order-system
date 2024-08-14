'use client';

import { ActionIcon, Affix, CloseButton, Flex, Title, useMantineTheme } from '@mantine/core';
import { FunctionComponent } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { IconFilter } from '@tabler/icons-react';
import classes from './styles.module.scss';
import FilterModal from '@/components/MenuFilterBar/FilterModal/FilterModal';
import { typeOptions, useFilters } from './useFilters';
import { MultiSelect } from '@/UI';

interface MenuFilterBarProps {

}
const MenuFilterBar: FunctionComponent<MenuFilterBarProps> = () => {
  const {
    categoryOptions,
    categoryValue, changeCategory,
    typeValue, changeType,
    resetFilters,
  } = useFilters({});

  const [opened, { open, close }] = useDisclosure(false);
  const theme = useMantineTheme();

  return (
    <Flex w="100%" justify="flex-end">
      <Flex className={classes.filterBarContainer} gap={24} justify="flex-end" align="flex-start">
        <Flex direction="column" gap={8}>
          <Title order={4}>Тип продукции</Title>
          <MultiSelect
            className={classes.select}
            data={typeOptions}
            value={typeValue}
            onChange={changeType}
          />
        </Flex>
        <Flex direction="column" gap={8}>
          <Title order={4}>Тип блюда</Title>
          <MultiSelect
            className={classes.select}
            data={categoryOptions}
            value={categoryValue}
            onChange={changeCategory}
          />
        </Flex>
        <Flex direction="column" gap={8}>
          <Title order={4} className={classes.resetButtonHeader}>ы</Title>
          <CloseButton
            disabled={categoryValue?.length === 0 && typeValue?.length === 0}
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
        <ActionIcon
          onClick={open}
          hiddenFrom="sm"
          radius="xl"
          variant="transparent"
          size={25}
        >
          <IconFilter />
        </ActionIcon>
      </Affix>
    </Flex>
  );
};

export default MenuFilterBar;
