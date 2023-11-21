import { useQuery } from '@tanstack/react-query';
import { getAllMessages } from '../../../api/actions';
import toast from 'react-hot-toast';

export function useGetAllMessages(params) {
  const { data: allMessages, isLoading } = useQuery({
    queryFn: () => getAllMessages(params),
    queryKey: [params.toString(), 'messages'],
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { allMessages, isLoading };
}
