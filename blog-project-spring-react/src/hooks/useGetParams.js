import { useLocation } from 'react-router';

export function useGetParams() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  return params;
}
