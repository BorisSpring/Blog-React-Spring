import { useQuery } from '@tanstack/react-query';
import { useGetParams } from './useGetParams';
import { getAllHomeSliders } from '../api/actions';
import toast from 'react-hot-toast';

export function useGetAllHomeSliders() {
  const params = useGetParams();
  const { data: allHomeSliders, isLoading } = useQuery({
    queryFn: () => getAllHomeSliders(params),
    queryKey: ['sliders', params.toString()],
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { allHomeSliders, isLoading };
}
