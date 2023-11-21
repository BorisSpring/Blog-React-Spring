import { useQuery } from '@tanstack/react-query';
import { findAllTags } from '../../../api/actions';

export function useGetAllTags() {
  const { data: allTags, isLoading } = useQuery({
    queryFn: () => findAllTags(),
    queryKey: ['tags'],
  });
  return { allTags, isLoading };
}
