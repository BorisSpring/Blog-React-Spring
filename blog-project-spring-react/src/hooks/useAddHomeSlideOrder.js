import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { addSlideOrderNumber } from '../api/actions';
export function useAddHomeSlideOrder() {
  const queryClient = useQueryClient();

  const { mutate: addSlideOrder, isLoading: isAddingOrder } = useMutation({
    mutationFn: ({ id, order }) => addSlideOrderNumber(id, order),
    onSuccess: (info) => {
      if (info) {
        toast.success('Succesfully added slide order');
        queryClient.invalidateQueries(window.location.href);
      } else {
        toast.error('Fail to add slide order try again!');
      }
    },
    onError: (err) => {
      toast.error(err);
    },
  });
  return { addSlideOrder, isAddingOrder };
}
