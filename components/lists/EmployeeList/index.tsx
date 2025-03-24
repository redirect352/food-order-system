'use client';

import { useSearchEmployeesQuery } from "@/lib/api/adminApi";
import { useSearchParamValues } from "@/shared/hooks";
import { ErrorPage, Pagination } from "@/UI";
import searchEmpty from '@/public/search_state.gif';
import { LoadingOverlay, Title } from "@mantine/core";
import Image from "next/image";
import classes from './styles.module.scss';
import EmployeesTable from "../../tables/EmployeesTable";

interface EmployeeListProps {
  
}

const EmployeeList = (props: EmployeeListProps) => {
  const pageSize = 20;
  const params = useSearchParamValues(['page','s','order','sort', 'office', 'active']);
  const { data, isFetching, error, refetch } = useSearchEmployeesQuery({
    page: params[0] ? +params[0] : 1,
    pageSize,
    s: params[1],
    sortOrder: params[2],
    orderBy:params[3],
    active: params[5]? params[5]==='true' : undefined,
    destinationOfficeId: params[4] ? +params[4] : undefined,
  });
  if(error){
    return (
      <ErrorPage 
        message={(error as any)?.message ?? 'Неизвестная ошибка'} 
        onRetry={refetch}
      />
    );
  }
  if(isFetching || data?.data.length===0){
    return (
      <div className={classes.loadingBox}>
        {
          isFetching ?
          <LoadingOverlay visible />
          :
          <>
            <Image src={searchEmpty} width={250} height={250} alt="Nothing found"/>
            <Title order={3}>По вашему запросу ничего не найдено</Title>
          </>
        }
      </div>
    )
  }
  return (
    <>
      <EmployeesTable items={data?.data ?? []}/>
      {data && <div className={classes.pagination}><Pagination total={data.totalPages}/></div>}
    </>
  )
};

export default EmployeeList;