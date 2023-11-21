import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { addSlideOrderNumber } from '../../../api/actions';
export function useAddHomeSlideOrder() {
  const queryClient = useQueryClient();

  const { mutate: addSlideOrder, isLoading: isAddingOrder } = useMutation({
    mutationFn: ({ id, order }) => addSlideOrderNumber(id, order),
    onSuccess: (response) => {
      if (response.status === 200) {
        toast.success('Succesfully added slide order');
        queryClient.invalidateQueries(window.location.href);
      } else {
        toast.error(response.msg);
      }
    },
  });
  return { addSlideOrder, isAddingOrder };
}
