import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updatePasswordRequest as updatePasswordRequestApi } from '../api/actions';
export function useChangePassword(reset) {
  const queryClient = useQueryClient();

  const { mutate: changePassword, isLoading: isChaning } = useMutation({
    mutationFn: (updatePasswordRequest) =>
      updatePasswordRequestApi(updatePasswordRequest),
    onSuccess: (info) => {
      if (info === true) {
        toast.success('Password has been changed susecfully');
        reset();
        queryClient.invalidateQueries([localStorage.getItem('jwt')]);
      } else {
        toast.error('Fail to change password');
      }
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { changePassword, isChaning };
}
