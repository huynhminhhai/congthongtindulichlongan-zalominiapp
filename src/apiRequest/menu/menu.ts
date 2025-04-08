import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import http from 'services/http';

import { ServiceResponseType } from './types';

const eventsApiRequest = {
  getMenu: async () => {
    return await http.get<ServiceResponseType>(`/menus`);
  },
};

export const useGetMenu = () => {
  return useQuery<ServiceResponseType>({
    queryKey: ['menu'],
    queryFn: async () => {
      try {
        return await eventsApiRequest.getMenu();
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
