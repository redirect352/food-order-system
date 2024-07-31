import Cookies from 'js-cookie';

export const useLogin = () => {
  const login = async (token: string) => {
    const user = { token };
    if (user) {
      Cookies.set('currentUser', JSON.stringify({ token }), { expires: 14 });
    }
    return user;
  };

  return { login };
};
