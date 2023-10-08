import { useMutation, useQueryClient } from '@tanstack/react-query';
import { banUser as banUserApi } from '../api/actions';
import toast from 'react-hot-toast';

export function useBanUser() {
  const queryClient = useQueryClient();
  const { mutate: banUser, isLoading: isBanning } = useMutation({
    mutationFn: (id) => banUserApi(id),
    onSuccess: (info) => {
      if (info) {
        toast.success('User has been banned succesfully');
        queryClient.invalidateQueries(window.location.href);
      } else {
        toast.error('Fail to ban user, try again !');
      }
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { banUser, isBanning };
}
