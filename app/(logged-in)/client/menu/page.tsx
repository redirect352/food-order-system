'use client';

import { FunctionComponent, useEffect, useState } from 'react';
import { Flex, Stack } from '@mantine/core';
import { MenuFilterBar, MenuList, NoContentPage } from '@/components';
import noMenuImage from '@/public/204Menu.png';
import classes from './styles.module.scss';
import { Pagination } from '@/UI';
import { useGetActualMenuQuery } from '@/lib/api/menuApi';
import { useAppDispatch, useSearchParamValue, useArraySearchParamValue } from '@/shared/hooks';
import { MenuPositionDto } from '@/shared/types';
import { setMenu } from '@/lib/features/menu/menuSlice';
import { CookieService } from '@/shared/services';

interface MenuProps {

}

const Menu : FunctionComponent<MenuProps> = () => {
  const pageSize = CookieService.getDefaultMenuPageSize();
  const menuItemsData: Array<any> = [123];
  const [pageCount, setPageCount] = useState(1);
  const page = useSearchParamValue<number>('page');
  const type = useSearchParamValue<string>('type');

  const categoryId = useArraySearchParamValue<number>('category', (s) => +s);
  const { data, error, isFetching } = useGetActualMenuQuery({
    page: page ?? 1,
    pageSize,
    dishCategoryId: categoryId?.toString() ?? undefined,
    productType: type ?? undefined,
  });
  const dispatch = useAppDispatch();
  const setMenuItems = (items : MenuPositionDto[]) => dispatch(setMenu(items));
  useEffect(() => {
    if (data) {
      setMenuItems(data.items);
      setPageCount(data.totalPages);
    }
  }, [data]);
  return (
  <>
    {
      menuItemsData.length === 0
      ?
        <NoContentPage
          buttonLabel="На главную"
          href="/"
          label="К сожалению меню временно отсутствует, попробуйте позже :("
          img={noMenuImage}
        />
      :
        <Stack
          className={classes.menuContainer}
          gap={24}
          align="center"
          pb="md"
        >
          <MenuFilterBar />
          <MenuList loading={isFetching} />
          <Flex w="100%" justify="flex-end" align="flex-end" flex="1 1 auto">
            <Pagination total={pageCount} boundaries={0} gap={4} size="sm" />
          </Flex>
        </Stack>
    }
  </>
);
};

export default Menu;