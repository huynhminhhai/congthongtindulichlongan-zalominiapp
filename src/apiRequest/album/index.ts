import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import http from 'services/http';
import { encodeQueryData } from 'utils';

import { AlbumItem, AlbumResponseType, ImageItemAlbumType } from './types';

type AlbumsParamsType = {
  page: number;
  size: number;
  search?: string;
};

const albumsApiRequest = {
  getListImageAlbums: async (params: AlbumsParamsType) => {
    return await http.get<any>(`/album?${encodeQueryData(params)}`);
  },
  getAlbumsDetail: async (id: number): Promise<ImageItemAlbumType[]> => {
    return await http.get<any>(`/album/${id}`);
  },
};

export const useGetListImageAlbums = (params: AlbumsParamsType, options?: { enabled?: boolean }) => {
  return useInfiniteQuery<AlbumResponseType>({
    queryKey: ['albumsList', params.search],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await albumsApiRequest.getListImageAlbums({
        ...params,
        page: pageParam as number,
      });

      return res;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.items.length === params.size ? allPages.length + 1 : undefined;
    },
    staleTime: 0,
    retry: 1,
    enabled: options?.enabled ?? true,
  });
};
export const useGetAlbumsDetail = (id: number) => {
  return useQuery<ImageItemAlbumType[]>({
    queryKey: ['albumsList', id],
    queryFn: async () => {
      try {
        return await albumsApiRequest.getAlbumsDetail(id);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    enabled: !!id,
    staleTime: 0,
    retry: 1,
  });
};
