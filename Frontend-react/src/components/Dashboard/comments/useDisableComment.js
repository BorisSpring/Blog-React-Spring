import { useMutation, useQueryClient } from '@tanstack/react-query';
import { disableCommentById } from '../../../api/actions';
import toast from 'react-hot-toast';

export function useDisableComment() {
  const queryClient = useQueryClient();

  const { mutate: disableComment, isLoading: isDisabling } = useMutation({
    mutationFn: (id) => disableCommentById(id),
    onSuccess: (response) => {
      if (response.status === 200) {
        queryClient.invalidateQueries(window.location.href);
        toast.success('Comment has been disabled');
      } else {
        toast.error(response);
      }
    },
  });
  return { disableComment, isDisabling };
}
