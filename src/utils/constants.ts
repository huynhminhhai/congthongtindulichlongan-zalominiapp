import { PostType } from 'apiRequest/posts/types';
import { AccommodationItem } from 'components/accommodation';
import { CusineItem } from 'components/cusine';
import { GuideItem } from 'components/guide';
import { LocationItem } from 'components/location';
import { NewsItem } from 'components/news';
import { TourItem } from 'components/tour';

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
