import { CategoryType } from 'apiRequest/categories/types';
import { MapType } from 'apiRequest/map/type';

export type PostsResponseType = {
  items: PostType[];
  total: number;
};
export type FavoriteResponseType = {
  total: number;
  items: FavoriteItemType[];
};

export type FavoriteItemType = {
  userId: number;
  postId: number;
  dateCreated: string;
  user: {
    id: number;
    name: string;
  };
  post: {
    id: number;
    title: string;
    slug: string;
    image: string;
  };
};

export type PostType = {
  id: number;
  title: string;
  summary: string;
  content: string;
  image: string;
  status: number;
  dateCreated: Date | null;
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
  vote: number;
  postTypeNames: string;
};
