import { CategoryType } from 'apiRequest/categories/types';
import { MapType } from 'apiRequest/map/type';

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
  categoryName: string;
  relatedPosts: PostType[];
  ratingDistribution: number[];
  averageRating: number;
  totalVotes: number;
  isFavorite: boolean;
  address: string;
  maps: MapType[];
  postTypeNames: string;
};
