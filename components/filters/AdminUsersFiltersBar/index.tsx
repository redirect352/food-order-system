'use client';

import { Flex } from "@mantine/core";
import classes from './styles.module.scss';
import { Select } from "@/UI";
import { orderOptions, sortFieldsOptions } from "./selectOptions";
import { useSearchParamState } from "@/shared/hooks";
interface AdminFiltersBarProps {
  
}
const AdminFiltersBar = (props: AdminFiltersBarProps) => {
  const [sort, setSort]= useSearchParamState('sort');
  const [sortOrder, setSortOrder]= useSearchParamState('order');
  return (
    <Flex className={classes.filtersBox} gap={'md'}>
      <Select
        value={sortOrder}
        onChange={(val) => setSortOrder(val ?? 'desc')}
        className={classes.select}
        label='Порядок сортировки'
        data={orderOptions}
      />
      <Select
        value={sort}
        onChange={(val) => setSort(val ?? 'id')}
        className={classes.select}
        label='Поле сортировки'
        data={sortFieldsOptions}
      />

    </Flex>  
  );
};

export default AdminFiltersBar;