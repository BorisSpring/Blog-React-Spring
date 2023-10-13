import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserImage } from '../api/actions';
import toast from 'react-hot-toast';

export function useUpdateImage() {
  const queryClient = useQueryClient();

  const { mutate: updateImage, isLoading: isUpdateingImage } = useMutation({
    mutationFn: ({ image, userId }) => updateUserImage(image, userId),
    onSuccess: (info) => {
      if (info === true) {
        queryClient.invalidateQueries([localStorage.getItem('jwt')]);
        toast.success('Image has been updated susecfully');
      } else {
        toast.error('Fail to update image');
      }
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { updateImage, isUpdateingImage };
}
