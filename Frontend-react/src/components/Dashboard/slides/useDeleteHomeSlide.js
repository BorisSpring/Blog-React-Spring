import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteHomeSlide } from '../../../api/actions';
import { useGetParams } from '../../../hooks/useGetParams';
import { useNavigate } from 'react-router';

export function useDeleteHomeSlide(paginationObject) {
  const queryClient = useQueryClient();
  const params = useGetParams();
  const navigate = useNavigate();
  const { mutate: deleteSlide, isLoading: isDeleting } = useMutation({
    mutationFn: (slideId) => deleteHomeSlide(slideId),
    onSuccess: (response) => {
      console.log(response, 'Response deltee');
      if (response.status === 204) {
        toast.success('Home slide has been deleted');
        if (paginationObject?.numberOfElements === 1) {
          queryClient.removeQueries(['sliders', params.toString()]);
          if (paginationObject?.number > 0)
            params.set('page', paginationObject?.number);
          navigate(`?${decodeURIComponent(params.toString())}`);
        } else {
          queryClient.invalidateQueries(window.location.href);
        }
      } else {
        toast.error('Failed to delete home slide');
      }
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { deleteSlide, isDeleting };
}
