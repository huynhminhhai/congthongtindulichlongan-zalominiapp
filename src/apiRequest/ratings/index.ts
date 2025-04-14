import { useMutation, useQuery } from '@tanstack/react-query';
import http from 'services/http';

import { RatingResponseType } from './types';

interface PostRatingParamsProps {
  postId: number;
  vote: number;
}
const ratingsApiRequest = {
  addRating: async (params: PostRatingParamsProps) => {
    return await http.post<any>(`/postRating/add?postId=${params.postId}`, { vote: params.vote });
  },
  getRating: async (postId: number) => {
    return await http.get<RatingResponseType>(`/postRating?postId=${postId}`);
  },
};
export const useAddRating = () => {
  return useMutation({
    mutationFn: async (params: PostRatingParamsProps) => {
      return await ratingsApiRequest.addRating(params);
    },
  });
};
export const useGetRating = (postId: number) => {
  return useQuery<RatingResponseType>({
    queryKey: [postId],
    queryFn: async () => {
      try {
        return await ratingsApiRequest.getRating(postId);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    retry: 1,
  });
};
