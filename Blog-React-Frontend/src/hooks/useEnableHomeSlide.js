import { useMutation, useQueryClient } from '@tanstack/react-query';
import { enableSlide as enableSlideApi } from '../api/actions';
import toast from 'react-hot-toast';

export function useEnableHomeSlide() {
  const queryClient = useQueryClient();

  const { mutate: enableSlide, isLoading: isEnabling } = useMutation({
    mutationFn: (slideId) => enableSlideApi(slideId),
    onSuccess: (info) => {
      if (info) {
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
  return { enableSlide, isEnabling };
}
