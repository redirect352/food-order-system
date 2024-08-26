'use client';

import { FunctionComponent, useEffect, useState } from 'react';
import { NoContentPage, OrderList } from '@/components';
import { useGetActiveOrdersQuery } from '@/lib/api/orderApi';
import { useSearchParamValue } from '@/shared/hooks';
import noOrdersImage from '@/public/204Order.png';

const ActiveOrders : FunctionComponent = () => {
  const pageFromUrl = useSearchParamValue<number>('page');
  const pageSize = 2;
  const [page, setPage] = useState(pageFromUrl ?? 1);
  const { data, isFetching } = useGetActiveOrdersQuery({ page, pageSize });
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
      <OrderList
        items={data?.items}
        totalPages={data?.totalPages}
        pageSize={pageSize}
        isFetching={isFetching}
      />
    }
    </>
  );
};

export default ActiveOrders;
