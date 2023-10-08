import { useQuery } from '@tanstack/react-query';
import { findAllComments } from '../api/actions';
import { useGetParams } from './useGetParams';
import toast from 'react-hot-toast';

export function useFindAllComments() {
  const params = useGetParams();
  !params?.get('page') && params.set('page', 1);
  console.log(params.toString());
  const { data: allComments, isLoading } = useQuery({
    queryFn: () => findAllComments(params),
    queryKey: ['comments', params.toString()],
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { allComments, isLoading };
}
