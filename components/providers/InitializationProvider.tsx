'use client';

import { useEffect } from 'react';
import { initializeUserData } from '@/lib/features/user/userSlice';
import { useAppDispatch} from '@/shared/hooks';
import { getRole } from '../../shared/actions/cookie-actions';

export default function InitializationProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    (getRole()).then(({role})=>{
      dispatch(initializeUserData({role, isLoggedIn: !!role}))
    })
  }, []);
  return <>{children}</>;
}
