import { useQuery } from '@tanstack/react-query';
import { getAllCategories } from '../api/actions';
import toast from 'react-hot-toast';

export function useGeAllCategories() {
  const { data: allCategories, isLoading } = useQuery({
    queryFn: getAllCategories,
    queryKey: ['categories'],
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { allCategories, isLoading };
}
