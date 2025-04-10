import { useGetCategoryDetail } from 'apiRequest/categories';
import { useGetPostsList } from 'apiRequest/posts';
import { PostType } from 'apiRequest/posts/types';
import { AccommodationItem } from 'components/accommodation';
import { CusineItem } from 'components/cusine';
import { HeaderSub } from 'components/header-sub';
import { LocationItem } from 'components/location';
import { NewsItem } from 'components/news';
import { FilterBar } from 'components/table';
import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStoreApp } from 'store/store';
import { Box, Input, Page, Select } from 'zmp-ui';

type PostComponentProps = {
  data: PostType; // hoặc định nghĩa rõ kiểu nếu có, ví dụ PostType
};
const layoutComponentMap: Record<string, React.FC<PostComponentProps>> = {
  HomeNews: NewsItem,
  DiaDiemHome: LocationItem,
  NhaHangKhachSanHome: AccommodationItem,
  DacSanDiaPhuongHome: CusineItem,
};
const PostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentLanguage } = useStoreApp();
  const { data: categoryDetail } = useGetCategoryDetail(Number(id));
  const { data: postsList } = useGetPostsList({ page: 1, size: 10, categoryId: Number(id) });
  const t = currentLanguage.value;
  const PostComponent = useMemo((): React.FC<PostComponentProps> => {
    if (categoryDetail) {
      return layoutComponentMap[categoryDetail.layout] || NewsItem;
    }
    return NewsItem;
  }, [categoryDetail]);

  return (
    <Page className="relative flex-1 flex flex-col bg-white">
      <Box>
        <HeaderSub title={categoryDetail?.name} onBackClick={() => navigate('/')} />
        <Box pb={4}>
          <FilterBar showAddButton={false} searchComponent={<Input.Search placeholder={t.Search} value={''} />}>
            {/* <div className="col-span-12">
                <Select placeholder={tCommon('all')} closeOnSelect>
                  <Option title={tCommon('all')} value={0} />
                </Select>
              </div> */}
          </FilterBar>

          <Box pb={4} px={4}>
            {postsList?.pages.map(page => page.items.map(data => <PostComponent key={data.id} data={data} />))}
          </Box>
        </Box>
      </Box>
    </Page>
  );
};

export default PostPage;
