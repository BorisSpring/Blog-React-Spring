import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createTag as createTagApi } from '../api/actions';

export function useCreateTag() {
  const queryClient = useQueryClient();
  const { mutate: createTag, isLoading: isCreating } = useMutation({
    mutationFn: (id) => createTagApi(id),
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
  return { createTag, isCreating };
}
