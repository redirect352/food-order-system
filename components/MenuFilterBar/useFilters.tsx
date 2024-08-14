import { useEffect, useState } from 'react';
import { ComboboxItem } from '@mantine/core';
import { useGetMenuCategoriesQuery } from '@/lib/api/menuApi';
import { useArraySearchParamValue, useUpdatePageURL } from '@/shared/hooks';

export function useFilters(param :object) {
  const { data, error } = useGetMenuCategoriesQuery(param);
  const [categoryOptions, setCategoryOptions] = useState<ComboboxItem[]>([]);
  const type = useArraySearchParamValue<string>('type');
  const categoryParam = useArraySearchParamValue<string>('category');
  const [categoryValue, changeCategory] = useState<string[] | undefined>();
  const [typeValue, changeType] = useState<string[] | undefined>();

  const { updateURL } = useUpdatePageURL();

  useEffect(() => {
    if (data) {
      const options = data.map(({ id, name }) => ({
        value: id.toString(),
        label: name,
      }));
      setCategoryOptions(options);
      if (categoryParam) {
        changeCategory(categoryParam);
      }
      changeType(type ?? []);
    }
  }, [data]);

  useEffect(() => {
    if (!categoryValue) return;
    if (categoryValue.length === 0) updateURL(['category', 'page'], ['', '']);
    updateURL(['category', 'page'], [categoryValue.toString(), '']);
  }, [categoryValue]);

  useEffect(() => {
    if (!typeValue) return;
    if (typeValue.length > 0) {
      updateURL(['type', 'page'], [typeValue.toString(), '1']);
    } else updateURL(['type', 'page'], ['', '']);
  }, [typeValue]);

  const resetFilters = () => {
    changeCategory([]);
    changeType([]);
    updateURL(['category', 'type', 'page'], ['', '', '']);
  };

  return {
    data,
    categoryOptions,
    categoryValue,
    changeCategory,
    typeValue,
    changeType,
    resetFilters,
  };
}

export const typeOptions: Array<ComboboxItem> = [
  { value: 'ownProduct', label: 'Блюда собственного производства' },
  { value: 'alien', label: 'Готовая продукция' },
];
