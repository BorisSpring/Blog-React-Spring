import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNewBlog } from '../../../api/actions';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

export function useCreateBlog(reset, setImage, blogId, setServerValidation) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: createBlog, isLoading: isCreating } = useMutation({
    mutationFn: (formData) => createNewBlog(formData),
    onSuccess: (response) => {
      if (response.status === 201) {
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
      } else if (response.status === 400) {
        toast.error(response.message);
      } else {
        setServerValidation(response);
      }
    },
  });
  return { createBlog, isCreating };
}
