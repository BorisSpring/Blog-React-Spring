import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNewBlog } from '../api/actions';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

export function useCreateBlog(reset, setImage, blogId) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: createBlog, isLoading: isCreating } = useMutation({
    mutationFn: (formData) => createNewBlog(formData),
    onSuccess: (data) => {
      if (data.id) {
        setImage();
        reset();
        if (!blogId) {
          queryClient.invalidateQueries(['newest']);
        } else {
          queryClient.invalidateQueries([
            'blogs',
            localStorage.getItem('lastUrl').replace('?', ''),
          ]);
          navigate(`/dashboard/blogs${localStorage.getItem('lastUrl')}`);
          localStorage.removeItem('lastUrl');
        }
        toast.success('Blog has been created');
      } else {
        toast.error('Fail to create blog');
      }
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { createBlog, isCreating };
}
