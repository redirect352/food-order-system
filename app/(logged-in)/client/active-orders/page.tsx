'use client';

import { FunctionComponent, useEffect, useState } from 'react';
import { Flex, Skeleton, Stack } from '@mantine/core';
import { NoContentPage, OrderCard } from '@/components';
import { useGetActiveOrdersQuery } from '@/lib/api/orderApi';
import classes from './styles.module.scss';
import { Pagination } from '@/UI';
import { useSearchParamValue } from '@/shared/hooks';
import noOrdersImage from '@/public/204Order.png';

const ActiveOrders : FunctionComponent = () => {
  const pageFromUrl = useSearchParamValue<number>('page');
  const pageSize = 2;
  const [page, setPage] = useState(pageFromUrl ?? 1);
  const { data, isFetching } = useGetActiveOrdersQuery({ page, pageSize });
  const loadingContent = [...Array(pageSize)].map((item, index) =>
    (<Skeleton key={index} className={classes.orderCardWrapper} />));
  useEffect(() => {
    if (data?.totalPages && data.totalPages !== 0 && data.items.length === 0) {
      setPage(data.totalPages);
    }
  }, [data]);
  useEffect(() => {
    setPage(pageFromUrl ?? 1);
  }, [pageFromUrl]);
  return (
    <>
    {
      data?.totalPages === 0
      ?
        <NoContentPage
          buttonLabel="В меню"
          href="menu"
          label="Отсутствуют активные заказы :("
          img={noOrdersImage}
        />
      :
      <Stack gap="xl" align="center" w="100%">
        {isFetching && loadingContent}
        {data &&
          data.items.map(item =>
            <OrderCard key={item.number} orderMainInfoDto={item} />
        )}
        <Flex w="100%" justify="flex-end" align="flex-end" flex="1 1 auto">
          <Pagination
            total={data?.totalPages ?? 1}
            boundaries={0}
            gap={4}
            size="sm"
          />
        </Flex>
      </Stack>
    }
    </>
  );
};

export default ActiveOrders;
