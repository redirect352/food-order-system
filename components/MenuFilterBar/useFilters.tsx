import { useEffect, useRef, useState } from 'react';
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
  const  needToResetPage = useRef(false);
  const { updateURL } = useUpdatePageURL();
  useEffect(() => {
    if (error) {
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
    const updatedFields = ['category', 'type'];
    if(needToResetPage.current) {
      updatedFields.push('page');
      needToResetPage.current = false;
    }
    updateURL(updatedFields, [
        categoryValue?.toString() ?? '',
        typeValue?.toString() ?? '',
        ''
      ]
    );
  }, [categoryValue, typeValue]);

  const changeWithSetPage = (func: (val?:string[]) => any) => {
    return (arg?:string[]) => { needToResetPage.current= true; func(arg)};
  }
  const resetFilters = () => {
    needToResetPage.current = true;
    changeCategory([]);
    changeType([]);
  };

  return {
    data,
    categoryOptions,
    categoryValue,
    changeCategory:changeWithSetPage(changeCategory),
    typeOptions,
    typeValue,
    changeType:changeWithSetPage(changeType),
    resetFilters,
    isFiltersActive,
  };
}

const typeOptions: Array<ComboboxItem> = [
  { value: 'ownProduct', label: 'Блюда собственного производства' },
  { value: 'alien', label: 'Готовая продукция' },
];
