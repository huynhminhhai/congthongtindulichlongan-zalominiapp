import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import http from 'services/http';
import { encodeQueryData } from 'utils';

import { VideoResponseType, VideoType } from './types';

type VideosParamsType = {
  page: number;
  size: number;
  search?: string;
};

const videosApiRequest = {
  getVideosList: async (params: VideosParamsType) => {
    return await http.get<any>(`/video?${encodeQueryData(params)}`);
  },
  getVideoDetail: async (id: number): Promise<VideoType> => {
    return await http.get<any>(`/video/${id}`);
  },
};

export const useGetVideosList = (params: VideosParamsType, options?: { enabled?: boolean }) => {
  return useInfiniteQuery<VideoResponseType>({
    queryKey: ['VideoList', params.search],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await videosApiRequest.getVideosList({
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
export const useGetVideoDetail = (id: number) => {
  return useQuery<VideoType>({
    queryKey: ['videoDetail', id],
    queryFn: async () => {
      try {
        return await videosApiRequest.getVideoDetail(id);
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
