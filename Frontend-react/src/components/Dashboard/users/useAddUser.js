import { useMutation } from '@tanstack/react-query';
import { addNewUser as addNewUserApi } from '../../../api/actions';
import toast from 'react-hot-toast';

export function useAddUser(setServerValidation) {
  const { mutate: addNewUser, isLoading: isAdding } = useMutation({
    mutationFn: (formData) => addNewUserApi(formData),
    onSuccess: (response) => {
      console.log(response, 'Res add user');
      if (response.status === 201) {
        toast.success('User succesfully created');
      } else {
        setServerValidation(response);
      }
    },
  });
  return { addNewUser, isAdding };
}
