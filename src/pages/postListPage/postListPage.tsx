import { Flex } from 'antd';
import { useGetCategoryDetail } from 'apiRequest/categories';
import { useGetPostsList } from 'apiRequest/posts';
import { PostType } from 'apiRequest/posts/types';
import { HeaderSub } from 'components/header-sub';
import { AccommodationItem } from 'components/PostComponent/accommodation';
import { CusineItem } from 'components/PostComponent/cusine';
import { LocationItem } from 'components/PostComponent/location';
import { NewsItem } from 'components/PostComponent/news';
import { FilterBar } from 'components/table';
import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStoreApp } from 'store/store';
import { gridLayoutComponentMap, layoutComponentMap, PostComponentPropsType } from 'utils/constants';
import { Box, Input, Page, Select } from 'zmp-ui';

import PostSkeleton from './postListSkeleton';

const PostListPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentLanguage } = useStoreApp();
  const { data: categoryDetail } = useGetCategoryDetail(Number(id));
  const { data: postsList } = useGetPostsList({ page: 1, size: 10, categoryId: Number(id) });
  const t = currentLanguage.value;
  const PostComponent = useMemo((): React.FC<PostComponentPropsType> => {
    if (categoryDetail) {
      return layoutComponentMap[categoryDetail.zaloLayout] || NewsItem;
    }
    return NewsItem;
  }, [categoryDetail]);
  const gridColumn = useMemo(() => {
    if (categoryDetail) {
      return gridLayoutComponentMap[categoryDetail.zaloLayout];
    }
    return 1;
  }, [categoryDetail]);
  return (
    <Page className="relative flex-1 flex flex-col bg-white">
      <Box>
        <HeaderSub title={categoryDetail?.name || '...'} onBackClick={() => navigate('/')} />
        <Box pb={4}>
          <FilterBar showAddButton={false} searchComponent={<Input.Search placeholder={t['Search']} value={''} />}>
            {/* <div className="col-span-12">
                <Select placeholder={tCommon('all')} closeOnSelect>
                  <Option title={tCommon('all')} value={0} />
                </Select>
              </div> */}
          </FilterBar>

          <Box pb={4} px={4}>
            {!postsList ? (
              <PostSkeleton gridColumn={gridColumn} />
            ) : (
              <div className={`grid gap-4 grid-cols-${gridColumn}`}>
                {postsList?.pages.map(page =>
                  page.items.map((data: PostType) => (
                    <PostComponent key={data.id} data={data} onClick={() => navigate(`/bai-viet/${data.id}`)} />
                  ))
                )}
              </div>
            )}
          </Box>
        </Box>
      </Box>
    </Page>
  );
};

export default PostListPage;
