import { useMutation, useQuery } from '@tanstack/react-query';
import http from 'services/http';
import { encodeQueryData } from 'utils';

type CommentsParamsType = {
  page: number;
  size: number;
  postId?: number;
};
const commentsApiRequest = {
  addComment: async (postId: number) => {
    return await http.post<any>(`/postComments/add?postId=${postId}`, {});
  },
  getCommentsList: async (params: CommentsParamsType) => {
    return await http.get<any>(`/postComments?${encodeQueryData(params)}`);
  },
};
export const useAddComment = () => {
  return useMutation({
    mutationFn: async (postId: number) => {
      return await commentsApiRequest.addComment(postId);
    },
  });
};
export const useGetCommentsList = (params: CommentsParamsType) => {
  return useQuery({
    queryKey: ['commentsList', params],
    queryFn: async () => {
      try {
        return await commentsApiRequest.getCommentsList(params);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    retry: 1,
  });
};
