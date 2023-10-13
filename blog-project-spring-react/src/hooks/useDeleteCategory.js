import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteCategoryById } from '../api/actions';

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  const { mutate: deleteCategory, isLoading: isDeleting } = useMutation({
    mutationFn: (categoryId) => deleteCategoryById(categoryId),
    onSuccess: (info) => {
      info
        ? toast.success('Category has been deleted')
        : toast.error('Fail to delete category');
      info && queryClient.invalidateQueries(['categories']);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { deleteCategory, isDeleting };
}
