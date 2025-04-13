import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import http from 'services/http';
import { getDataFromStorage } from 'services/zalo';
import { encodeQueryData } from 'utils';

const favoritesApiRequest = {
  addFavorite: async (postId: number) => {
    return await http.post<any>(`/postFavorites/add?postId=${postId}`, {});
  },
  removeFavorite: async (postId: number) => {
    return await http.post<any>(`/postFavorites/remove?postId=${postId}`, {});
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
