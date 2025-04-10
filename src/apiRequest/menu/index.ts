import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import http from 'services/http';

import { MenuResponseType } from './types';

const menuApiRequest = {
  getMenu: async () => {
    return await http.get<MenuResponseType>(`/menus`);
  },
};

export const useGetMenu = () => {
  return useQuery<MenuResponseType>({
    queryKey: ['menu'],
    queryFn: async () => {
      try {
        return await menuApiRequest.getMenu();
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
