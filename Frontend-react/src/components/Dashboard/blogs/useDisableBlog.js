import { useMutation, useQueryClient } from '@tanstack/react-query';
import { disableBlogById } from '../../../api/actions';
import toast from 'react-hot-toast';

export function useDisableBlog() {
  const queryClient = useQueryClient();

  const { mutate: disableBlog, isLoading: isDisabling } = useMutation({
    mutationFn: (id) => disableBlogById(id),
    onSuccess: (response) => {
      if (response.status === 200) {
        queryClient.invalidateQueries(window.location.href);
        toast.success('Blog has been disabled');
      } else {
        toast.error(response);
      }
    },
  });
  return { disableBlog, isDisabling };
}
