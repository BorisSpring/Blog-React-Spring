import { useQuery } from '@tanstack/react-query';
import { findBlogById } from '../../api/actions';
import { useParams } from 'react-router';

export function useFindBlogById() {
  const { blogId } = useParams();
  const { data: blogById, isLoading: isLoadingBlog } = useQuery({
    queryFn: () => findBlogById(blogId),
    queryKey: ['blog', blogId],
    retry: false,
  });
  return { blogById, isLoadingBlog };
}
