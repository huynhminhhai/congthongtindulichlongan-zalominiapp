import { CategoryType } from 'apiRequest/categories/types';

export type PostsResponseType = {
  items: PostType[];
  total: number;
};
export type PostType = {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  image: string;
  langId: number;
  sourceId: number;
  status: number;
  dateCreated: string;
  hitCount: number | null;
  publishedDate: Date | null;
  isHot: boolean;
  seoInfo: {
    title: string | null;
    description: string | null;
    keywords: string | null;
  };
  categories: CategoryType[];
};
