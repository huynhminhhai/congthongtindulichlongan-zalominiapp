import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import http from 'services/http';
import { useSnackbar } from 'zmp-ui';

const commentsApiRequest = {
  getCommentsList: async (param: { paramName: string; itemId: number; page: number; pageSize: number }) => {
    return await http.get<any[]>(
      `/comments?${param.paramName}=${param.itemId}&_page=${param.page}&_limit=${param.pageSize}`
    );
  },
  addComment: async (param: { paramName: string; itemId: number; name: string; email: string; body: string }) => {
    return await http.post(`/comments`, {
      [param.paramName]: param.itemId,
      name: param.name,
      body: param.body,
    });
  },
};

export const useGetCommentsListdsds = (paramName: string, itemId: number, pageSize: number) => {
  return useInfiniteQuery({
    queryKey: ['commentsList', paramName, itemId, pageSize],
    queryFn: async ({ pageParam = 1 }) => {
      try {
        return await commentsApiRequest.getCommentsList({ paramName, itemId, page: pageParam, pageSize });
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === pageSize ? allPages.length + 1 : undefined;
    },
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};

export const useAddCommentdsdsd = () => {
  const queryClient = useQueryClient();
  const { openSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: async (data: any) => {
      return await commentsApiRequest.addComment(data);
    },
    onSuccess: () => {
      openSnackbar({
        icon: true,
        text: 'Thêm bình luận thành công',
        type: 'success',
        action: { text: 'Đóng', close: true },
        duration: 3000,
      });

      queryClient.invalidateQueries({ queryKey: ['commentsList'] });
    },
    onError: (error: string) => {
      console.error('Error creating news:', error);
      openSnackbar({
        icon: true,
        text: error,
        type: 'error',
        action: { text: 'Đóng', close: true },
        duration: 3000,
      });
    },
  });
};
