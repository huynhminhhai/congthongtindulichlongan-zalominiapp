export type VideoType = {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  image: string;
  displayOrder: number | null;
  status: boolean;
  viewCount: number | null;
  dateCreate: string;
  url: string;
};

export type VideoResponseType = {
  total: number;
  items: VideoType[];
};
