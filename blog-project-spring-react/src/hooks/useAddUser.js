import { useMutation } from '@tanstack/react-query';
import { addNewUser as addNewUserApi } from '../api/actions';
import toast from 'react-hot-toast';

export function useAddUser() {
  const { mutate: addNewUser, isLoading: isAdding } = useMutation({
    mutationFn: (formData) => addNewUserApi(formData),
    onSuccess: (user) => {
      user?.id > 0
        ? toast.success('User succesfully created')
        : toast.error('Failed to create new user!');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { addNewUser, isAdding };
}
