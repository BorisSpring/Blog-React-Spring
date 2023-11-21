import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateInfoApi } from '../../../api/actions';
import toast from 'react-hot-toast';

export function useUpdateUserInfo(setServerValidation) {
  const queryClient = useQueryClient();
  const { mutate: updateInfo, isLoading: isUpdateing } = useMutation({
    mutationFn: (updateInfoRequest) => updateInfoApi(updateInfoRequest),
    onSuccess: (response) => {
      if (response.status === 200) {
        queryClient.invalidateQueries([localStorage.getItem('jwt')]);
        toast.success('Information has been suscefully updated');
      } else if (response.status === 400) {
        toast.error(response);
      } else {
        setServerValidation(response);
      }
    },
  });
  return { updateInfo, isUpdateing };
}
