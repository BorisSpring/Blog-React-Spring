import { useQuery } from '@tanstack/react-query';
import { useGetParams } from './useGetParams';
import { findAllUsers } from '../api/actions';
import toast from 'react-hot-toast';

export function useFindAllUser() {
  const params = useGetParams();

  const { data: allUsers, isLoading } = useQuery({
    queryFn: async () => await findAllUsers(params),
    queryKey: ['users', params.toString()],
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { allUsers, isLoading };
}
