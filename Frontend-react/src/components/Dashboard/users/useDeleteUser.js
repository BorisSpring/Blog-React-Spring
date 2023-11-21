import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { deleteUser as deleteUserApi } from '../../../api/actions';
import { useGetParams } from '../../../hooks/useGetParams';

export function useDeleteUser(allUsers) {
  const queryClient = useQueryClient();
  const params = useGetParams();
  const navigate = useNavigate();
  const { mutate: deleteUser, isLoading: isDeleting } = useMutation({
    mutationFn: (userId) => deleteUserApi(userId),
    onSuccess: (response) => {
      if (response.status === 204) {
        toast.success('User has been deleted');
        if (allUsers?.numberOfElements === 1) {
          queryClient.removeQueries(['users', params.toString()]);
          if (allUsers.number > 0) {
            params.set('page', Number(params.get('page')) - 1);
            navigate(`?${decodeURIComponent(params.toString())}`);
          }
        } else {
          queryClient.invalidateQueries(window.location.href);
        }
      } else {
        toast.error(response.data.message);
      }
    },
    onError: (err) => {
      toast.error(err);
    },
  });
  return { deleteUser, isDeleting };
}
