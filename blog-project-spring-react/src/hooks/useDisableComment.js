import { useMutation, useQueryClient } from '@tanstack/react-query';
import { disableCommentById } from '../api/actions';
import toast from 'react-hot-toast';

export function useDisableComment() {
  const queryClient = useQueryClient();

  const { mutate: disableComment, isLoading: isDisabling } = useMutation({
    mutationFn: (id) => disableCommentById(id),
    onSuccess: (info) => {
      if (info) {
        queryClient.invalidateQueries(window.location.href);
        toast.success('Comment has been disabled');
      } else {
        toast.error('Fail to disable comment');
      }
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { disableComment, isDisabling };
}
