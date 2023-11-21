import { useMutation, useQueryClient } from '@tanstack/react-query';
import { enableBlogById } from '../../../api/actions';
import toast from 'react-hot-toast';

export function useEnableBlog() {
  const queryClient = useQueryClient();

  const { mutate: enableBlog, isLoading: isEnabling } = useMutation({
    mutationFn: (id) => enableBlogById(id),
    onSuccess: (response) => {
      if (response.status === 200) {
        queryClient.invalidateQueries(window.location.href);
        toast.success('Blog has been enabled');
      } else {
        toast.error(response);
      }
    },
  });
  return { enableBlog, isEnabling };
}
