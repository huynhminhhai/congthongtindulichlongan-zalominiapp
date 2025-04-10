import { CategoryType } from 'apiRequest/categories/types';

export type PostsResponseType = {
  items: PostType[];
  total: number;
};
export type PostType = {
  id: number;
  title: string;
  summary: string;
  content: string;
  image: string;
  status: number;
  publishedDate: Date | null;
  categories: CategoryType[];
  relatedPosts: PostType[];
};
