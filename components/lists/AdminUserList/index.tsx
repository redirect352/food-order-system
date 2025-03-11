'use client';

import UserCard from "@/components/cards/UserCard";
import { useSearchUsersQuery } from "@/lib/api/adminApi";
import { ErrorPage, Pagination } from "@/UI";
import { Skeleton } from "@mantine/core";
import { FunctionComponent } from "react";
import { useSearchParamValue } from "@/shared/hooks";
import classes from './styles.module.scss';

interface AdminUserListProps {
  
}
 
const AdminUserList: FunctionComponent<AdminUserListProps> = () => {
  const pageSize = 3;
  const page = useSearchParamValue<number>('page');
  
  const { data, isFetching, error, refetch } = useSearchUsersQuery({page: page ?? 1, pageSize});
  if(error){
    return (<ErrorPage message={(error as any)?.message ?? 'Неизвестная ошибка'} onRetry={refetch}/>);
  }
  if(isFetching){
    return ([...new Array(pageSize)]).map((_, index)=> <Skeleton key={index} w={'100%'} mih={400} />)
  }
  return (
    <>
      {data?.data.map((id) => <UserCard key={id} userId={id}/>)}
      {data && <div className={classes.pagination}><Pagination total={data.totalPages}/></div>}
    </>
  )
}
 
export default AdminUserList;