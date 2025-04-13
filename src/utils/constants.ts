import { PostType } from 'apiRequest/posts/types';
import { AccommodationItem } from 'components/PostComponent/accommodation';
import { CusineItem } from 'components/PostComponent/cusine';
import { GuideItem } from 'components/PostComponent/guide';
import { LocationItem } from 'components/PostComponent/location';
import { NewsItem } from 'components/PostComponent/news';
import { TourItem } from 'components/PostComponent/tour';

export const SLIDE_SPACE_BETWEEN_HOMEPAGE = 20;
export const SLIDE_PER_VIEW_HOMEPAGE = 1.2;

export type PostComponentProps = {
  data: PostType;
  onClick?: () => void;
};

export const layoutComponentMap: Record<string, React.FC<PostComponentProps>> = {
  HomeNews: NewsItem,
  SuKienHome: NewsItem,
  DiaDiemHome: LocationItem,
  NhaHangKhachSanHome: AccommodationItem,
  DacSanDiaPhuongHome: CusineItem,
  HuongDanVienDuLichHome: GuideItem,
  TourDuLichHome: TourItem,
};
