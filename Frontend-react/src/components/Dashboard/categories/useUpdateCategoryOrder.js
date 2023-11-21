import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCategoryOrder as updateCategoryOrderApi } from '../../../api/actions';
import toast from 'react-hot-toast';

export function useUpdateCategoryOrder() {
  const queryClient = useQueryClient();

  const { mutate: updateCategoryOrder, isLoading: isUpdatingOrder } =
    useMutation({
      mutationFn: ({ categoryId, orderNumber }) =>
        updateCategoryOrderApi(categoryId, orderNumber),
      onSuccess: (response) => {
        if (response.status === 200) {
          toast.success('Cateogry order updated suscesfully');
          queryClient.invalidateQueries(['categories']);
        } else {
          toast.error(response);
        }
      },
    });

  return { updateCategoryOrder, isUpdatingOrder };
}
