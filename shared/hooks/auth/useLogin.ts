import { handleLogin } from '@/shared/actions/cookie-actions';

export const useLogin = () => {
  const login = async (token: string, role: string) => handleLogin(token, role);

  return { login };
};
