'use client';

import { ComboboxData, Flex } from "@mantine/core";
import classes from './styles.module.scss';
import { Select } from "@/UI";
import { orderOptions, sortFieldsOptions } from "./selectOptions";
import { useSearchParamState } from "@/shared/hooks";
import OfficeFilter from "../OfficeFilter";
interface SortOrderFilterBarProps {
  orderOptionsDef?: ComboboxData,
  sortFieldsOptionsDef?: ComboboxData,
}
const SortOrderFilterBar = ({orderOptionsDef, sortFieldsOptionsDef, children}: React.PropsWithChildren<SortOrderFilterBarProps>) => {
  const [sort, setSort]= useSearchParamState('sort');
  const [sortOrder, setSortOrder]= useSearchParamState('order');
  return (
    <Flex className={classes.filtersBox} gap={'md'}>
      <Select
        value={sortOrder}
        onChange={(val) => setSortOrder(val ?? 'desc')}
        className={classes.select}
        label='Порядок сортировки'
        data={orderOptionsDef ?? orderOptions}
      />
      <Select
        value={sort}
        onChange={(val) => setSort(val ?? 'id')}
        className={classes.select}
        label='Поле сортировки'
        data={sortFieldsOptionsDef ?? sortFieldsOptions}
      />
      {children}
    </Flex>  
  );
};

export default SortOrderFilterBar;