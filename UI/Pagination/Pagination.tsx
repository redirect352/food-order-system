'use client';

import { Pagination as MantinePagination, PaginationProps } from '@mantine/core';
import React, { useState } from 'react';
import { useSearchParamValue, useUpdatePageURL } from '@/shared/hooks';

export default function Pagination(props : PaginationProps) {
  const { updateURL } = useUpdatePageURL();
  const currentPage = useSearchParamValue<number>('page') ?? 1;
  const [activePage, setPage] = useState(currentPage);
  const onChange = (pageNumber: number | string) => {
      setPage(+pageNumber);
      updateURL('page', pageNumber.toString());
  };
  return (
      <MantinePagination
        {...props}
        value={activePage}
        onChange={onChange}
      />
  );
}
