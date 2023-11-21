import { useQuery } from '@tanstack/react-query';
import { useGetParams } from '../../../hooks/useGetParams';
import { getAllBlogs } from '../../../api/actions';
import toast from 'react-hot-toast';

export function useGetAllBlogs() {
  const params = useGetParams();

  const { data: allBlogs, isLoading } = useQuery({
    queryFn: () => getAllBlogs(params),
    queryKey: ['blogs', params.toString()],
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { allBlogs, isLoading };
}
