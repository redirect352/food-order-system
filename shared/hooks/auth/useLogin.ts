import { handleLogin } from '@/shared/actions/cookie-actions';
import { useAppDispatch } from '../storeHooks';
import { login } from '../../../lib/features/user/userSlice';

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const loginFunction = async (token: string, role: string, refreshToken: string) => {
    await handleLogin(token, refreshToken, role);
    dispatch(login(role));
  }
  return { login: loginFunction };
};
