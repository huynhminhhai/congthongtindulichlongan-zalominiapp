import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import http from 'services/http';

const newsApiRequest = {
    getNewsList: async (param: { page: number; pageSize: number; search?: string }) => {
        const searchQuery = param.search ? `&q=${encodeURIComponent(param.search)}` : '';
        return await http.get<any[]>(`/posts?_page=${param.page}&_limit=${param.pageSize}${searchQuery}`);
    },
    getNewsDetail: async (id: number) => {
        return await http.get<any>(`/posts/${id}`);
    },
};

export const useGetNewsList = (param: { page: number; pageSize: number; search?: string }) => {
    return useInfiniteQuery({
        queryKey: ['newsList', param.pageSize, param.search],
        queryFn: async ({ pageParam = 1 }) => {
            try {
                return await newsApiRequest.getNewsList({
                    page: pageParam,
                    pageSize: param.pageSize,
                    search: param.search,
                });
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length === param.pageSize ? allPages.length + 1 : undefined;
        },
        staleTime: 1000 * 60 * 5,
        retry: 1,
    });
};

export const useGetNewsDetail = (id: number) => {

    return useQuery({
        queryKey: ['newsDetail', id],
        queryFn: async () => {
            try {
                return await newsApiRequest.getNewsDetail(id);
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