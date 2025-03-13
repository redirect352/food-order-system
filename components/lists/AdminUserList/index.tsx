'use client';

import UserCard from "@/components/cards/UserCard";
import { useSearchUsersQuery } from "@/lib/api/adminApi";
import { ErrorPage, Pagination } from "@/UI";
import { LoadingOverlay, Skeleton, Title } from "@mantine/core";
import { FunctionComponent } from "react";
import { useSearchParamValues } from "@/shared/hooks";
import classes from './styles.module.scss';
import Image from "next/image";
import searchEmpty from '@/public/search_state.gif';

interface AdminUserListProps {
  
}
 
const AdminUserList: FunctionComponent<AdminUserListProps> = () => {
  const pageSize = 3;
  const r = useSearchParamValues(['page','s','order','sort']);
  console.log(r);
  const { data, isFetching, error, refetch } = useSearchUsersQuery({
    page: r[0] ? +r[0] : 1,
    pageSize,
    s: r[1],
    sortOrder: r[2],
    orderBy:r[3],
  });
  if(error){
    return (<ErrorPage message={(error as any)?.message ?? 'Неизвестная ошибка'} onRetry={refetch}/>);
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
      {data?.data.map((id) => <UserCard key={id} userId={id}/>)}
      {data && <div className={classes.pagination}><Pagination total={data.totalPages}/></div>}
    </>
  )
}
 
export default AdminUserList;