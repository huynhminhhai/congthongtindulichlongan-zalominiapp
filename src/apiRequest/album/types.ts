export type AlbumItem = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  image: string;
  displayOrder: number | null;
  status: boolean;
  viewCount: number | null;
  dateCreate: string;
};
export type ImageItemAlbumType = {
  id: number;
  name: string;
  image: string;
};
export type AlbumResponseType = {
  total: number;
  items: AlbumItem[];
};
