import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { unbanUser as unbanUserApi } from '../../../api/actions';

export function useUnbanUser() {
  const queryClient = useQueryClient();
  const { mutate: unbanUser, isLoading: isUnbanning } = useMutation({
    mutationFn: (id) => unbanUserApi(id),
    onSuccess: (response) => {
      if (response.status === 200) {
        queryClient.invalidateQueries(window.location.href);
        toast.success('User has been unbanned succesfully');
      } else {
        toast.error(response);
      }
    },
  });
  return { unbanUser, isUnbanning };
}
