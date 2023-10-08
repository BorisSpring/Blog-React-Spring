import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBlogById } from '../api/actions';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';

export function useDeleteBlog(currentPage, numberOfElements, params) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: deleteBlog, isLoading: IsDeleting } = useMutation({
    mutationFn: (id) => deleteBlogById(id),
    onSuccess: (info) => {
      if (info) {
        if (numberOfElements === 1) {
          queryClient.removeQueries(['blogs', params.toString()]);
          params.set('page', currentPage - 1);
          navigate(`?${decodeURIComponent(params)}`);
        } else {
          queryClient.invalidateQueries(window.location.href);
        }
        toast.success('Blog has been deleted succesfully');
      } else {
        toast.error('Fail to delete blog');
      }
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { deleteBlog, IsDeleting };
}
