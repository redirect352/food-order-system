import { handleLogin } from '@/shared/actions/cookie-actions';

export const useLogin = () => {
  const login = async (token: string) => handleLogin(token);

  return { login };
};
