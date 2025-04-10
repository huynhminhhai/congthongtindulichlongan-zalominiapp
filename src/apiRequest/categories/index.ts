import { useQuery } from '@tanstack/react-query';
import http from 'services/http';

const categoriesApiRequest = {
  getCategoryDetail: async (id: number) => {
    return await http.get<any>(`/categories/${id}`);
  },
};

export const useGetCategoryDetail = (id: number) => {
  return useQuery({
    queryKey: ['categoryDetail', id],
    queryFn: async () => {
      try {
        return await categoriesApiRequest.getCategoryDetail(id);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
