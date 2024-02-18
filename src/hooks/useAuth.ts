import Cookies from 'universal-cookie';
import { useMutation } from '@tanstack/react-query';
import { axiosClient } from '../services';
import { enqueueSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

interface LoginCredentials {
  username: string;
  password: string;
}

export function useAuth() {
  const cookies = new Cookies();
  const token = cookies.get('token');
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => axiosClient.post('/api/login', credentials).then((res) => res.data),
    onSuccess: (res) => {
      const { token } = res;
      cookies.set('token', token, { path: '/' });
      enqueueSnackbar('Login successful', { variant: 'success' });
    },
    onError: () => {
      enqueueSnackbar('Login failed', { variant: 'error' });
    },
  });

  function logout() {
    cookies.remove('token');
    navigate('/login');
    enqueueSnackbar('Logout successful', { variant: 'info' });
  }

  return {
    token,
    isAuthenticated: !!token,
    login: (credentials: LoginCredentials) => loginMutation.mutate(credentials),
    logout,
  };
}
