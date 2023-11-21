import { useQuery } from '@tanstack/react-query';
import { findSlideById } from '../../../api/actions';
import { useParams } from 'react-router';
import toast from 'react-hot-toast';

export function useFindHomeSlideById() {
  const { slideId } = useParams();
  const { data: slideById, isLoading } = useQuery({
    queryFn: () => findSlideById(slideId),
    queryKey: ['slideId', slideId],
    onError: (err) => {
      toast.error(err.message);
    },
    enabled: !!slideId,
  });
  return { slideById, isLoading };
}
