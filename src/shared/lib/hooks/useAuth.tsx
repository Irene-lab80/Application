import Cookies from 'universal-cookie';

export const cookies = new Cookies();

export const useAuth = () => {
  const token = cookies.get('token');
  return !!token;
};
