import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updatePasswordRequest as updatePasswordRequestApi } from '../../../api/actions';
export function useChangePassword(setServerValidation) {
  const queryClient = useQueryClient();

  const { mutate: changePassword, isLoading: isChaning } = useMutation({
    mutationFn: (updatePasswordRequest) =>
      updatePasswordRequestApi(updatePasswordRequest),
    onSuccess: (response) => {
      console.log(response, 'response');
      if (response.status === 200) {
        toast.success('Password has been changed susecfully');
        queryClient.invalidateQueries([localStorage.getItem('jwt')]);
      } else {
        setServerValidation(response);
        response.msg && toast.error(response.msg);
      }
    },
  });
  return { changePassword, isChaning };
}
