import { useQuery } from '@tanstack/react-query';
import { findLastThreeImportnat } from '../api/actions';
import toast from 'react-hot-toast';

export function useFindLastThreeImportant() {
  const { data: lastThreeImportant, isLoading: isLoadingImportant } = useQuery({
    queryFn: findLastThreeImportnat,
    queryKey: ['importantBlogs'],
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { lastThreeImportant, isLoadingImportant };
}
