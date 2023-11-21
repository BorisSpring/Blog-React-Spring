import { useMutation, useQueryClient } from '@tanstack/react-query';
import { banUser as banUserApi } from '../../../api/actions';
import toast from 'react-hot-toast';

export function useBanUser() {
  const queryClient = useQueryClient();
  const { mutate: banUser, isLoading: isBanning } = useMutation({
    mutationFn: (id) => banUserApi(id),
    onSuccess: (response) => {
      if (response.status === 200) {
        toast.success('User has been banned succesfully');
        queryClient.invalidateQueries(window.location.href);
      } else {
        toast.error(response);
      }
    },
  });
  return { banUser, isBanning };
}
