import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addBlogComment } from '../../api/actions';
import toast from 'react-hot-toast';
import { useParams } from 'react-router';

export function useAddComment(reset, setCommentValidation) {
  const queryClient = useQueryClient();
  const { blogId } = useParams();
  const { mutate: addComment, isLoading: isAdding } = useMutation({
    mutationFn: ({ blogId, comment }) => addBlogComment(blogId, comment),
    onSuccess: (comment) => {
      if (comment.id) {
        queryClient.invalidateQueries(['blog', blogId]);
        toast.success('Comment posted succesfully');
        reset();
      } else {
        setCommentValidation(comment);
      }
    },
  });
  return { addComment, isAdding };
}
