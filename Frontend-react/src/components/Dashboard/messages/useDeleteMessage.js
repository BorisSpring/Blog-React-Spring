import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useGetParams } from '../../../hooks/useGetParams';
import { useNavigate } from 'react-router';
import { deleteMessage as deleteMessageApi } from '../../../api/actions';

export function useDeleteMessage(numberOfElementsInPage) {
  const params = useGetParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: deleteMsg, isLoading: isDeleting } = useMutation({
    mutationFn: (msgId) => deleteMessageApi(msgId),
    onSuccess: (res) => {
      if (res.status === 204) {
        if (numberOfElementsInPage === 1) {
          params.set('page', Number(params.get('page')) - 1);
          queryClient.removeQueries([params.get('page'), 'messages']);
          navigate(`?${decodeURIComponent(params.toString())}`);
        } else {
          queryClient.invalidateQueries(window.location.href);
        }
        toast.success('Message has been Deleted');
      } else {
        toast.error('Fail to delete message');
      }
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { deleteMsg, isDeleting };
}
