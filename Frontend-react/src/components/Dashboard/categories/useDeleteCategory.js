import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteCategoryById } from '../../../api/actions';

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  const { mutate: deleteCategory, isLoading: isDeleting } = useMutation({
    mutationFn: (categoryId) => deleteCategoryById(categoryId),
    onSuccess: (response) => {
      if (response.status === 204) {
        toast.success('Category has been deleted');
        queryClient.invalidateQueries(['categories']);
      } else {
        toast.error(response);
      }
    },
  });
  return { deleteCategory, isDeleting };
}
