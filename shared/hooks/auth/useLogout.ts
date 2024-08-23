import { handleLogout } from '@/shared/actions/cookie-actions';
import { useAppDispatch } from '../storeHooks';
import { endLogout } from '@/lib/features/user/userSlice';

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const clearStore = () => dispatch(endLogout());
  const logout = async () => {
    await handleLogout();
    clearStore();
  };
  return { logout };
};
