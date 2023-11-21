import { useMutation, useQueryClient } from '@tanstack/react-query';
import { disableSlide as disableSlideApi } from '../../../api/actions';
import toast from 'react-hot-toast';

export function useDisableHomeSlide() {
  const queryClient = useQueryClient();

  const { mutate: disableSlide, isLoading: isDisabling } = useMutation({
    mutationFn: (slideId) => disableSlideApi(slideId),
    onSuccess: (response) => {
      if (response.status === 200) {
        toast.success('Slide enabled succesfully');
        queryClient.invalidateQueries(window.location.href);
      } else {
        toast.error('Failed to enable slide');
      }
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { disableSlide, isDisabling };
}
