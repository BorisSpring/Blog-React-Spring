import { useQuery } from '@tanstack/react-query';
import { find3newest } from '../api/actions';
import toast from 'react-hot-toast';

export function useFind3NewestBlogs() {
  const { data: newestThree, isLoading } = useQuery({
    queryFn: () => find3newest(),
    queryKey: ['newest three'],
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { newestThree, isLoading };
}
