import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { enableCommentById } from '../api/actions';

export function useEnableComment() {
  const queryClient = useQueryClient();

  const { mutate: enableComment, isLoading: isEnabling } = useMutation({
    mutationFn: (id) => enableCommentById(id),
    onSuccess: (info) => {
      if (info) {
        queryClient.invalidateQueries(window.location.href);
        toast.success('Comment has been enabled');
      } else {
        toast.error('Fail to enable comment');
      }
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { enableComment, isEnabling };
}
