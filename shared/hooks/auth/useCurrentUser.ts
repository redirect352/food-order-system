import { useEffect, useState } from 'react';
import { useGetOwnInfoQuery } from '../../../lib/api/userApi';
import { UserOwnInfoDto } from '../../types/user';

export const useCurrentUser = () => {
  const {data, error, isLoading}= useGetOwnInfoQuery(undefined);
  const [user, setUser] = useState<UserOwnInfoDto | null>(null);
  useEffect(() => {
    if(data) setUser(data);
  }, [data]);
  return user;
};
