import { handleLogin } from '@/shared/actions/cookie-actions';

export const useLogin = () => {
  const login = async (token: string, role: string, refreshToken: string) => 
    handleLogin(token, refreshToken, role);

  return { login };
};
