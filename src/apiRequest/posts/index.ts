import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import http from 'services/http';
import { getDataFromStorage } from 'services/zalo';
import { encodeQueryData } from 'utils';

import { PostsResponseType, PostType } from './types';

type PostParamsType = {
  page: number;
  size: number;
  search?: string;
  categoryId?: number;
  postId?: number;
  langId?: number;
};
const postsApiRequest = {
  getPostsList: async (params: PostParamsType): Promise<PostsResponseType> => {
    const langId = Number((await getDataFromStorage('langId')) || 1);
    params = { ...params, langId };
    return await http.get<any>(`/posts?${encodeQueryData(params)}`);
  },
  getPostDetail: async (id: number): Promise<PostType> => {
    return await http.get<any>(`/posts/${id}`);
  },
  getListPostFavorite: async (params: PostParamsType) => {
    const langId = Number((await getDataFromStorage('langId')) || 1);
    params = { ...params, langId };
    return await http.get<any>(`/postFavorites?${encodeQueryData(params)}`);
  },
};

export const useGetPostsList = (params: PostParamsType, options?: { enabled?: boolean }) => {
  return useInfiniteQuery<PostsResponseType>({
    queryKey: ['postsList', params.categoryId],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await postsApiRequest.getPostsList({
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

export const useGetPostsListForScroll = (params: PostParamsType, options?: { enabled?: boolean }) => {
  return useInfiniteQuery<PostsResponseType>({
    queryKey: ['postsList', params.categoryId],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await postsApiRequest.getPostsList({
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

export const useGetPostDetail = (id: number) => {
  return useQuery<PostType>({
    queryKey: ['postDetail', id],
    queryFn: async () => {
      try {
        return await postsApiRequest.getPostDetail(id);
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
export const useGetFavoritePosts = (params: PostParamsType, options?: { enabled?: boolean }) => {
  return useInfiniteQuery({
    queryKey: ['favoritePosts', params.size],
    queryFn: async ({ pageParam = 1 }) => {
      try {
        const res = await postsApiRequest.getListPostFavorite({
          page: pageParam,
          size: params.size,
          search: params.search,
          categoryId: params.categoryId,
          postId: params.postId,
        });

        return res?.items;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === params.size ? allPages.length + 1 : undefined;
    },
    staleTime: 0,
    retry: 1,
    enabled: options?.enabled ?? true,
  });
};
