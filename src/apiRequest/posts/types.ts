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
  rating: number;
  isFavorite: boolean;
  address: string;
  postMaps: MapType[];
  postTypeNames: string;
};
