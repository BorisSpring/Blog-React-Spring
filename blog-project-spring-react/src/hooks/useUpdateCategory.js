import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCategory as updateCategoryApi } from '../api/actions';
import toast from 'react-hot-toast';

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  const { mutate: updateCategory, isLoading: isUpdateing } = useMutation({
    mutationFn: ({ categoryId, categoryName }) =>
      updateCategoryApi(categoryId, categoryName),
    onSuccess: (info) => {
      if (info) {
        toast.success('Category has been update succesfully');
        queryClient.invalidateQueries(['categories']);
      } else {
        toast.error('Fail to update category');
      }
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { updateCategory, isUpdateing };
}
