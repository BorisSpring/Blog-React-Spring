import { useQuery, useQueryClient } from '@tanstack/react-query';
import { findBlogById } from '../api/actions';
import { useParams } from 'react-router';
import toast from 'react-hot-toast';

export function useFindBlogById() {
  const queryClient = useQueryClient();
  const { blogId } = useParams();
  const { data: blogById, isLoading: isLoadingBlog } = useQuery({
    queryFn: () => findBlogById(Number(blogId)),
    queryKey: ['blog', blogId],
    enabled: Number(blogId) > 0,
    retry: false,
    onError: (err) => {
      toast.error(err?.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['newest three']);
    },
  });
  return { blogById, isLoadingBlog };
}
