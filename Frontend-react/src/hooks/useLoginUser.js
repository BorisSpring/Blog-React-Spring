import { useMutation } from '@tanstack/react-query';
import { loginUser as loginUserApi } from '../api/actions';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

export function useLoginUser() {
  const navigate = useNavigate();
  const { mutate: loginUser, isLoading } = useMutation({
    mutationFn: async (loginReq) => await loginUserApi(loginReq),
    onSuccess: (auth) => {
      if (auth.auth === true) {
        localStorage.setItem('jwt', auth.jwt);
        navigate('/dashboard');
      }
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { loginUser, isLoading };
}
