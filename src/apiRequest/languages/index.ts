import { useQuery } from '@tanstack/react-query';
import http from 'services/http';

import { LanguageResponseType } from './types';

const eventsApiRequest = {
  getLanguagesList: async () => {
    return await http.get<LanguageResponseType>(`/languages`);
  },
};

export const useGetLanguages = () => {
  return useQuery<LanguageResponseType>({
    queryKey: ['languages'],
    queryFn: async () => {
      try {
        return await eventsApiRequest.getLanguagesList();
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 1,
    retry: 1,
  });
};
