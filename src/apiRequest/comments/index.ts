import { useMutation, useQuery } from '@tanstack/react-query';
import http from 'services/http';
import { encodeQueryData } from 'utils';

type CommentsParamsType = {
  page: number;
  size: number;
  postId?: number;
};

type AddCommentsParamsType = {
  content: string;
  name?: string;
  postId: number;
};
const commentsApiRequest = {
  addComment: async (params: AddCommentsParamsType) => {
    return await http.post<any>(`/postComments/add?postId=${params.postId}`, {
      content: params.content,
      name: params.name,
    });
  },
  getCommentsList: async (params: CommentsParamsType) => {
    return await http.get<any>(`/postComments?${encodeQueryData(params)}`);
  },
};
export const useAddComment = () => {
  return useMutation({
    mutationFn: async (params: AddCommentsParamsType) => {
      return await commentsApiRequest.addComment(params);
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
