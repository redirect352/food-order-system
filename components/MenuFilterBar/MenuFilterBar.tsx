'use client';

import { ActionIcon, Affix, CloseButton, ComboboxItem, Flex, Title, useMantineTheme } from '@mantine/core';
import { createContext, Dispatch, FunctionComponent, SetStateAction } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { IconFilter, IconFilterFilled } from '@tabler/icons-react';
import classes from './styles.module.scss';
import FilterModal from '@/components/MenuFilterBar/FilterModal/FilterModal';
import { useFilters } from './useFilters';
import { MultiSelect } from '@/UI';
import DeliveryDestinationInput from '../DeliveryDestinationInput';
import dynamic from 'next/dynamic';

interface MenuFilterBarProps {

}
const NoSsr = dynamic(() => import('../DeliveryDestinationInput'), {ssr: false});
const MenuFilterBar: FunctionComponent<MenuFilterBarProps> = () => {
  const filters = useFilters();
  const {
    categoryOptions, categoryValue, changeCategory,
    typeOptions, typeValue, changeType,
    resetFilters, isFiltersActive,
  } = useFilters();
  const [opened, { open, close }] = useDisclosure(false);
  const theme = useMantineTheme();
  return (
    <FilterContext.Provider value={filters}>
      <Flex className={classes.filtersBox}>
        <DeliveryDestinationInput />
        {/* <NoSsr /> */}
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
              disabled={categoryOptions.length === 0}
            />
          </Flex>
          <Flex direction="column" gap={8}>
            <Title order={4} className={classes.resetButtonHeader}>ы</Title>
            <CloseButton
              disabled={isFiltersActive}
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
        <Affix
          position={{ top: 10, right: theme.spacing.md }}
          hiddenFrom="sm"
          hidden={opened}
          >
          <ActionIcon
            onClick={open}
            hiddenFrom="sm"
            radius="xl"
            variant="transparent"
            size={25}
          >
            { isFiltersActive ?
              <IconFilter />
              :
              <IconFilterFilled />
            }
          </ActionIcon>
        </Affix>
      </Flex>
    </FilterContext.Provider>
  );
};

export default MenuFilterBar;
export const FilterContext = createContext({
  categoryOptions: [] as ComboboxItem[],
  categoryValue: [] as string[] | undefined,
  changeCategory: (() => {}) as any,
  typeOptions: [] as ComboboxItem[],
  typeValue: [] as string[] | undefined,
  changeType: (() => {}) as any,
  resetFilters: () => {},
  isFiltersActive: false,
});
