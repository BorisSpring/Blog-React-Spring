import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUserImage } from '../api/actions';
import toast from 'react-hot-toast';

export function useDeleteImage() {
  const queryClient = useQueryClient();

  const { mutate: deleteImage, isLoading: isDeleting } = useMutation({
    mutationFn: (userId) => deleteUserImage(userId),
    onSuccess: (info) => {
      if (info === true) {
        toast.success('Image has been deleted succesfully');
        queryClient.invalidateQueries([localStorage.getItem('jwt')]);
      } else {
        toast.error('Fail to delete image');
      }
    },
    onError: () => {
      toast.error('Error occured during sending picture try agian');
    },
  });

  return { deleteImage, isDeleting };
}
