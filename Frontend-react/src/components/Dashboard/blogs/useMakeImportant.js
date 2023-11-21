import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { makeBlogImportant } from '../../../api/actions';

export function useMakeImportant() {
  const queryClient = useQueryClient();
  const { mutate: makeImportant, isLoading: isMakeingImportant } = useMutation({
    mutationFn: (id) => makeBlogImportant(id),
    onSuccess: (response) => {
      if (response.status === 200) {
        queryClient.invalidateQueries(window.location.href);
        toast.success('Blog has been marked as important');
        queryClient.invalidateQueries(['importantBlogs']);
      } else {
        toast.error(response);
      }
    },
  });
  return { makeImportant, isMakeingImportant };
}
