import { useQuery } from '@tanstack/react-query';
import { findBlogsForPage } from '../../api/actions';
import { useGetParams } from '../../hooks/useGetParams';
import toast from 'react-hot-toast';

export function useFindBlogsForPage() {
  const params = useGetParams();
  !params.get('page') && params.set('page', 1);
  const { data: pageBlogs, isLoading } = useQuery({
    queryFn: () => findBlogsForPage(params),
    queryKey: ['pageBlogs', params.toString()],
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { pageBlogs, isLoading };
}
