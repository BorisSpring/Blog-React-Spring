import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCategory as updateCategoryApi } from '../../../api/actions';
import toast from 'react-hot-toast';

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  const { mutate: updateCategory, isLoading: isUpdateing } = useMutation({
    mutationFn: ({ categoryId, categoryName }) =>
      updateCategoryApi(categoryId, categoryName),
    onSuccess: (response) => {
      if (response.status === 200) {
        toast.success('Category has been update succesfully');
        queryClient.invalidateQueries(['categories']);
      } else {
        toast.error(response);
      }
    },
  });
  return { updateCategory, isUpdateing };
}
