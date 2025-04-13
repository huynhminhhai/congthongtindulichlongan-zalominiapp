import { useQuery } from '@tanstack/react-query';
import http from 'services/http';
import { getDataFromStorage } from 'services/zalo';

import { CategoryType } from './types';

const categoriesApiRequest = {
  getCategoryDetail: async (id: number) => {
    return await http.get<CategoryType>(`/categories/${id}`);
  },
  getCategoryListShowHome: async () => {
    const langId = Number((await getDataFromStorage('langId')) || 1);
    return await http.get<CategoryType[]>(`/categories/home?langId=${langId}`);
  },
  getCategoryListHasMap: async () => {
    const langId = Number((await getDataFromStorage('langId')) || 1);
    return await http.get<CategoryType[]>(`/categories/map?langId=${langId}`);
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

export const useGetCategoryListShowHome = () => {
  return useQuery({
    queryKey: ['categoryListShowHome'],
    queryFn: async () => {
      try {
        return await categoriesApiRequest.getCategoryListShowHome();
      } catch (error) {
        console.error(error);
        throw error;
      }
    },

    staleTime: 1000 * 30,
    retry: 1,
  });
};
export const useGetCategoryListHasMap = () => {
  return useQuery({
    queryKey: ['categoryListHasMap'],
    queryFn: async () => {
      try {
        return await categoriesApiRequest.getCategoryListHasMap();
      } catch (error) {
        console.error(error);
        throw error;
      }
    },

    staleTime: 1000 * 30,
    retry: 1,
  });
};
