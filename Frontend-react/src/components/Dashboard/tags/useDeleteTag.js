import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTagById } from '../../../api/actions';
import toast from 'react-hot-toast';

export function useDeleteTag() {
  const queryClient = useQueryClient();
  const { mutate: deleteTag, isLoading: isDeleting } = useMutation({
    mutationFn: (tagId) => deleteTagById(tagId),
    onSuccess: (response) => {
      if (response.status === 204) {
        toast.success('Tag has been deleted');
        queryClient.invalidateQueries(window.location.href);
      } else {
        toast.error(response.data.msg);
      }
    },
  });
  return { deleteTag, isDeleting };
}
