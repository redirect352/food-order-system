'use client';

import { useEffect } from 'react';
import { initializeUserData, selectIsLoggingOut } from '@/lib/features/user/userSlice';
import { useAppDispatch, useAppSelector, useLogout } from '@/shared/hooks';
import { getRole } from '../../shared/actions/cookie-actions';
import { initializeStore } from '../../lib/features/cart/cartSlice';

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
    if(typeof window !== 'undefined')
      dispatch(initializeStore());
  }, []);
  return <>{children}</>;
}
