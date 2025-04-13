import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import http from 'services/http';
import { getDataFromStorage } from 'services/zalo';
import { encodeQueryData } from 'utils';

const favoritesApiRequest = {
  addFavorite: async (postId: number) => {
    const response = await http.post<any>('/fvr/add', {
      postId,
    });
    return response;
  },
  removeFavorite: async (postId: number) => {
    const response = await http.post<any>('/fvr/remove', {
      postId,
    });
    return response;
  },
};
export const useAddFavorite = () => {
  return useMutation({
    mutationFn: async (postId: number) => {
      return await favoritesApiRequest.addFavorite(postId);
    },
  });
};
export const useRemoveFavorite = () => {
  return useMutation({
    mutationFn: async (postId: number) => {
      return await favoritesApiRequest.removeFavorite(postId);
    },
  });
};
