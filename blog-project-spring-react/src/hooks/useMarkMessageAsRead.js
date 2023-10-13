import { useMutation, useQueryClient } from '@tanstack/react-query';
import { markMsgAsRead } from '../api/actions';
import toast from 'react-hot-toast';

export function useMarkMessageAsRead() {
  const queryClient = useQueryClient();

  const { mutate: markAsRead, isLoading: isMarking } = useMutation({
    mutationFn: async (msgId) => await markMsgAsRead(msgId),
    onSuccess: (response) => {
      if (response) {
        toast.success('Sucessfuly Marked');
        queryClient.invalidateQueries(window.location.href);
      } else {
        toast.error('Fail to Mark Message');
      }
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { markAsRead, isMarking };
}
