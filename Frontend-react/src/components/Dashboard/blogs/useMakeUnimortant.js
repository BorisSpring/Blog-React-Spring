import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { makeBlogUnImportant } from '../../../api/actions';

export function useMakeUnImportant() {
  const queryClient = useQueryClient();
  const { mutate: unMarkBlog, isLoading: isUnMarkingBlog } = useMutation({
    mutationFn: (id) => makeBlogUnImportant(id),
    onSuccess: (info) => {
      if (info) {
        queryClient.invalidateQueries(window.location.href);
        toast.success('Blog has been marked as unimportant');
      } else {
        toast.error('Fail to mark blog as unimportant');
      }
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { unMarkBlog, isUnMarkingBlog };
}
