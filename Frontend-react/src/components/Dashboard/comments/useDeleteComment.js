import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { deleteCommentById } from '../../../api/actions';
import toast from 'react-hot-toast';
import { useGetParams } from '../../../hooks/useGetParams';

export function useDeleteComment(numberOfElements, currentPage) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const params = useGetParams();

  const { mutate: deleteComment, isLoading: isDeleting } = useMutation({
    mutationFn: (commentId) => deleteCommentById(commentId),
    onSuccess: (response) => {
      if (response.status === 204) {
        toast.success('Comment has been deleted');
        if (numberOfElements === 1 && currentPage > 1) {
          queryClient.removeQueries(['comments', params.toString()]);
          params.set('page', currentPage - 1);
          navigate(`?${decodeURIComponent(params.toString())}`);
        } else {
          queryClient.invalidateQueries(['comments', params.toString()]);
        }
      } else {
        toast.error(response);
      }
    },
  });
  return { deleteComment, isDeleting };
}
