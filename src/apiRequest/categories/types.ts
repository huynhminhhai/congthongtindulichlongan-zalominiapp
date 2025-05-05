import { PostType } from 'apiRequest/posts/types';

export type CategoryType = {
  id: number;
  name: string;
  layout: string;
  isRating: boolean;
  isMap: boolean;
  isComment: boolean;
  zaloLayout: string;
  url: string;
  posts: PostType[];
  icon: string;
  iconClass: string;
};
export type CategoryOptionType = {
  text: string;
  value: string;
};
