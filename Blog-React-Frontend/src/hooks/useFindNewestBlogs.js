import { useQuery } from '@tanstack/react-query';
import { findNewest } from '../api/actions';
import toast from 'react-hot-toast';

export function useFindNewestBlogs() {
  const { data: newestBlogs, isLoading: isLoadingNewest } = useQuery({
    queryFn: () => findNewest(),
    queryKey: ['newest'],
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { newestBlogs, isLoadingNewest };
}
