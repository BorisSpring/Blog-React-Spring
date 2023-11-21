import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createTag as createTagApi } from '../../../api/actions';

export function useCreateTag() {
  const queryClient = useQueryClient();
  const { mutate: createTag, isLoading: isCreating } = useMutation({
    mutationFn: (tagName) => createTagApi(tagName),
    onSuccess: (response) => {
      console.log('res', response);
      if (response.status === 201) {
        toast.success('Tag has been created');
        queryClient.invalidateQueries(window.location.href);
      } else {
        toast.error('Fail to create tag');
      }
    },
    onError: (err) => {
      toast.error(err.response.data.msg + ' a');
    },
  });
  return { createTag, isCreating };
}
