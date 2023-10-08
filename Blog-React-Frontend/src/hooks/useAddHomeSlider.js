import { useMutation } from '@tanstack/react-query';
import { addHomeSlider as addHomeSliderApi } from './../api/actions';
import toast from 'react-hot-toast';

export function useAddHomeSlider() {
  const { mutate: addHomeSlider, isLoading: isAddingSlider } = useMutation({
    mutationFn: (slideRequest) => addHomeSliderApi(slideRequest),
    onSuccess: (data) => {
      data?.id > 0
        ? toast.success('Susecfully added new home slider')
        : toast.error('Fail to add home slider try again later!');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { addHomeSlider, isAddingSlider };
}
