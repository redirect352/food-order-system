import { handleLogout } from '@/shared/actions/cookie-actions';

export const useLogout = () => {
  const logout = async () => {
    await handleLogout();
  };
  return { logout };
};
