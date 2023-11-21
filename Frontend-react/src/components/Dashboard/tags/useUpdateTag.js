import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTagById } from '../../../api/actions';
import toast from 'react-hot-toast';

export function useUpdateTag() {
  const queryClinet = useQueryClient();
  const { mutate: updateTag, isLoading: isUpdating } = useMutation({
    mutationFn: ({ tagId, name }) => updateTagById(tagId, name),
    onSuccess: (response) => {
      if (response.status === 200) {
        queryClinet.invalidateQueries(window.location.href);
        toast.success('Tag has been updated succesfully');
      } else {
        toast.error('Fail to update tag');
      }
    },
    onError: (err) => {
      toast.error(err);
    },
  });
  return { updateTag, isUpdating };
}
