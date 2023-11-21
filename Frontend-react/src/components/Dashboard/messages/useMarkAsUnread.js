import { useMutation, useQueryClient } from '@tanstack/react-query';
import { markAsUnread } from '../../../api/actions';
import toast from 'react-hot-toast';

export function useMarkAsUnread() {
  const queryClient = useQueryClient();

  const { mutate: unread, isLoading: isUnreading } = useMutation({
    mutationFn: (msgId) => markAsUnread(msgId),
    onSuccess: (response) => {
      if (response.status === 200) {
        toast.success('Sucessfuly Unmarked');
        queryClient.invalidateQueries(window.location.href);
      } else {
        toast.error('Fail to Unmark Message');
      }
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { unread, isUnreading };
}
