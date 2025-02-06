import { useEffect, useState } from 'react';
import { ComboboxItem } from '@mantine/core';
import { useGetMenuCategoriesQuery } from '@/lib/api/menuApi';
import { useArraySearchParamValue, useUpdatePageURL } from '@/shared/hooks';
import { NotificationService } from '@/shared/services';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

export function useFilters() {
  const { data, error } = useGetMenuCategoriesQuery({});
  const [categoryOptions, setCategoryOptions] = useState<ComboboxItem[]>([]);
  const type = useArraySearchParamValue<string>('type');
  const categoryParam = useArraySearchParamValue<string>('category');
  const [categoryValue, changeCategory] = useState<string[] | undefined>();
  const [typeValue, changeType] = useState<string[] | undefined>();
  const [isFiltersActive, setActive] = useState(false);

  const { updateURL } = useUpdatePageURL();
  useEffect(() => {
    if (error) {
      console.log(error);
      NotificationService.showErrorNotification({
        title: 'Ошибка получения категорий',
        message: `${(error as FetchBaseQueryError)?.status} ${(error as any)?.message} `,
      });
    }
  }, [error]);
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
    setActive(((categoryValue?.length ?? 0) === 0 &&
    ((typeValue?.length ?? 0) === 0)));
    if (!categoryValue && !typeValue) return;
    updateURL(['category', 'type', 'page'], [
      categoryValue?.toString() ?? '',
      typeValue?.toString() ?? '',
      '']);
  }, [categoryValue, typeValue]);

  const resetFilters = () => {
    changeCategory([]);
    changeType([]);
  };

  return {
    data,
    categoryOptions,
    categoryValue,
    changeCategory,
    typeOptions,
    typeValue,
    changeType,
    resetFilters,
    isFiltersActive,
  };
}

const typeOptions: Array<ComboboxItem> = [
  { value: 'ownProduct', label: 'Блюда собственного производства' },
  { value: 'alien', label: 'Готовая продукция' },
];
