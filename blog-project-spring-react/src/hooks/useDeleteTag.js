import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTagById } from '../api/actions';
import toast from 'react-hot-toast';

export function useDeleteTag() {
  const queryClient = useQueryClient();
  const { mutate: deleteTag, isLoading: isDeleting } = useMutation({
    mutationFn: (id) => deleteTagById(id),
    onSuccess: (info) => {
      if (info) {
        toast.success('Tag has been deleted');
        queryClient.invalidateQueries(window.location.href);
      } else {
        toast.error('Fail to delete tag');
      }
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { deleteTag, isDeleting };
}
