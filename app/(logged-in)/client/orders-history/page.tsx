'use client';

import { FunctionComponent, useEffect, useState } from 'react';
import { NoContentPage, OrderList, OrdersTotal } from '@/components';
import noOrdersImage from '@/public/204Order.png';
import { useSearchParamValue } from '@/shared/hooks';
import { useGetOrdersListQuery } from '@/lib/api/orderApi';
import { ErrorPage } from '@/UI';

const OrdersHistory : FunctionComponent = () => {
  const pageFromUrl = useSearchParamValue<number>('page');
  const pageSize = 2;
  const [page, setPage] = useState(pageFromUrl ?? 1);
  const { data, isFetching, error } = useGetOrdersListQuery({ page, pageSize, active: 0 });
  useEffect(() => {
    if (data?.totalPages && data.totalPages !== 0 && data.items.length === 0) {
      setPage(data.totalPages);
    }
  }, [data]);
  useEffect(() => {
    setPage(pageFromUrl ?? 1);
  }, [pageFromUrl]);
  if (error) {
    return (
      <ErrorPage
        message={error?.message}
      />
    );
  }
  return (
    <>
    {
      data?.totalPages === 0
      ?
        <NoContentPage
          buttonLabel="В меню"
          href="menu"
          label="История заказов отсутствует :("
          img={noOrdersImage}
        />
      :
      <>
        <OrdersTotal />
        <OrderList
          items={data?.items}
          totalPages={data?.totalPages}
          pageSize={pageSize}
          isFetching={isFetching}
        />
      </>
    }
    </>
  );
};

export default OrdersHistory;
