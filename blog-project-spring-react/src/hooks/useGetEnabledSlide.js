import { useQuery } from '@tanstack/react-query';
import { getEnabledSlides } from '../api/actions';

export function useGetEnabledSlide() {
  const { data: enabledSlides, isLoading: isLoadingEnabledSlides } = useQuery({
    queryFn: () => getEnabledSlides(),
    queryKey: ['enabledSlides'],
  });
  return { enabledSlides, isLoadingEnabledSlides };
}
