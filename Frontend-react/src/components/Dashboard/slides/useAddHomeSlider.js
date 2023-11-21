import { useMutation } from '@tanstack/react-query';
import { addHomeSlider as addHomeSliderApi } from '../../../api/actions';
import toast from 'react-hot-toast';

export function useAddHomeSlider(setSliderServerValidation) {
  const { mutate: addHomeSlider, isLoading: isAddingSlider } = useMutation({
    mutationFn: (slideRequest) => addHomeSliderApi(slideRequest),
    onSuccess: (response) => {
      if (response.status === 201 || response.status === 200) {
        toast.success('Susecfully added new home slider');
      } else {
        setSliderServerValidation(response);
      }
    },
  });
  return { addHomeSlider, isAddingSlider };
}
