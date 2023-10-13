import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { deleteCommentById } from '../api/actions';
import toast from 'react-hot-toast';
import { useGetParams } from './useGetParams';

export function useDeleteComment(numberOfElements, currentPage) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const params = useGetParams();

  const { mutate: deleteComment, isLoading: isDeleting } = useMutation({
    mutationFn: (commentId) => deleteCommentById(commentId),
    onSuccess: (info) => {
      if (info) {
        toast.success('Comment has been deleted');
        if (numberOfElements === 1 && currentPage > 1) {
          queryClient.removeQueries(['comments', params.toString()]);
          params.set('page', currentPage - 1);
          navigate(`?${decodeURIComponent(params.toString())}`);
        } else {
          queryClient.invalidateQueries(['comments', params.toString()]);
        }
      } else {
        toast.error('Fail to delete comment');
      }
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { deleteComment, isDeleting };
}
