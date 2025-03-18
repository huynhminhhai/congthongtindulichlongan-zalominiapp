import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import http from 'services/http';

const eventsApiRequest = {
    getEventsList: async (param: { page: number; pageSize: number }) => {
        return await http.get<any[]>(`/posts?_page=${param.page}&_limit=${param.pageSize}`);
    },
    getEventsDetail: async (id: number) => {
        return await http.get<any>(`/posts/${id}`);
    },
};

export const useGetEventsList = (param: { page: number; pageSize: number }) => {

    return useInfiniteQuery({
        queryKey: ['eventsList', param.pageSize],
        queryFn: async ({ pageParam = 1 }) => {
            try {
                return await eventsApiRequest.getEventsList({ page: pageParam, pageSize: param.pageSize });
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
    })
};

export const useGetEventsDetail = (id: number) => {

    return useQuery({
        queryKey: ['eventsDetail', id],
        queryFn: async () => {
            try {
                return await eventsApiRequest.getEventsDetail(id);
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