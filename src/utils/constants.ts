import { PostType } from 'apiRequest/posts/types';
import { AccommodationItem } from 'components/PostComponent/accommodation';
import { CusineItem } from 'components/PostComponent/cusine';
import { GuideItem } from 'components/PostComponent/guide';
import { LocationItem } from 'components/PostComponent/location';
import { NewsItem } from 'components/PostComponent/news';
import { TourItem } from 'components/PostComponent/tour';

export const SLIDE_SPACE_BETWEEN_HOMEPAGE = 20;
export const SLIDE_PER_VIEW_HOMEPAGE = 1.2;

export type PostComponentPropsType = {
  data: PostType;
  onClick?: () => void;
};

export const layoutComponentMap: Record<string, React.FC<PostComponentPropsType>> = {
  HomeNews: NewsItem,
  SuKienHome: NewsItem,
  DiaDiemHome: LocationItem,
  NhaHangKhachSanHome: AccommodationItem,
  DacSanDiaPhuongHome: CusineItem,
  HuongDanVienDuLichHome: GuideItem,
  TourDuLichHome: TourItem,
};
export const gridLayoutComponentMap: Record<string, number> = {
  HomeNews: 1,
  SuKienHome: 1,
  DiaDiemHome: 1,
  NhaHangKhachSanHome: 1,
  DacSanDiaPhuongHome: 1,
  HuongDanVienDuLichHome: 2,
  TourDuLichHome: 1,
};
