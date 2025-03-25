'use client';
import { useGetOfficeFullInfoListQuery } from '@/lib/api/adminApi';
import { BranchesTable } from '@/components';
import { LoadingOverlay, Title } from '@mantine/core';
import { ErrorPage, Pagination } from '@/UI';
import Image from "next/image";
import searchEmpty from '@/public/search_state.gif';
import { useSearchParamValues } from '@/shared/hooks';
import commonClasses from '../styles.module.scss';


interface BranchOfficeListProps {
  
}

const BranchOfficeList = (props: BranchOfficeListProps) => {
  const params = useSearchParamValues(['page','order','sort']);
  const { data, error, isFetching, refetch }= useGetOfficeFullInfoListQuery({
    page: params[0] ? +params[0] : 1,
    pageSize:30,
    orderBy: params[2] ?? 'id',
    sortOrder: params[1] ?? 'desc'
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
        <div className={commonClasses.loadingBox}>
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
      <BranchesTable items={data?.data ?? []} />
      {data && <div className={commonClasses.pagination}><Pagination total={data.totalPages}/></div>}
    </>
  );
};

export default BranchOfficeList;