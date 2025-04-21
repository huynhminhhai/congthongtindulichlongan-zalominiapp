import { PostType } from 'apiRequest/posts/types';
import { AccommodationItem } from 'components/PostComponent/AccommodationItem';
import { CusineItem } from 'components/PostComponent/CusineItem';
import { GuideItem } from 'components/PostComponent/GuideItem';
import { LocationItem } from 'components/PostComponent/LocationItem';
import { NewsItem } from 'components/PostComponent/NewsItem';
import { TourItem } from 'components/PostComponent/TourItem';

export const SLIDE_SPACE_BETWEEN_HOMEPAGE = 20;
export const SLIDE_PER_VIEW_HOMEPAGE = 1.2;

export type PostComponentPropsType = {
  data: PostType;
  onClick?: () => void;
};

export const LAYOUT_COMPONENT_MAP: Record<string, React.FC<PostComponentPropsType>> = {
  HomeNews: NewsItem,
  SuKienHome: NewsItem,
  DiaDiemHome: LocationItem,
  NhaHangKhachSanHome: AccommodationItem,
  DacSanDiaPhuongHome: CusineItem,
  HuongDanVienDuLichHome: GuideItem,
  TourDuLichHome: TourItem,
};
export const GRID_COLUMN_LAYOUT_MAP: Record<string, number> = {
  HomeNews: 1,
  SuKienHome: 1,
  DiaDiemHome: 1,
  NhaHangKhachSanHome: 1,
  DacSanDiaPhuongHome: 1,
  HuongDanVienDuLichHome: 2,
  TourDuLichHome: 1,
};
export const SLIDE_PER_VIEWS_SECTION_HOMEPAGE: Record<string, number> = {
  HomeNews: SLIDE_PER_VIEW_HOMEPAGE,
  SuKienHome: SLIDE_PER_VIEW_HOMEPAGE,
  DiaDiemHome: SLIDE_PER_VIEW_HOMEPAGE,
  NhaHangKhachSanHome: SLIDE_PER_VIEW_HOMEPAGE,
  DacSanDiaPhuongHome: SLIDE_PER_VIEW_HOMEPAGE,
  TourDuLichHome: SLIDE_PER_VIEW_HOMEPAGE,
  HuongDanVienDuLichHome: 2.1,
};
