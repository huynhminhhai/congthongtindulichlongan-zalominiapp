import { useGetCategoryDetail } from 'apiRequest/categories';
import { useGetPostsListForScroll } from 'apiRequest/posts';
import { PostType } from 'apiRequest/posts/types';
import { HeaderSub } from 'components/header-sub';
import { NewsItem } from 'components/PostComponent/news';
import { FilterBar } from 'components/table';
import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStoreApp } from 'store/store';
import { GRID_COLUMN_LAYOUT_MAP, LAYOUT_COMPONENT_MAP, PostComponentPropsType } from 'utils/constants';
import { Box, Input, Page } from 'zmp-ui';

import PostSkeleton from './postListSkeleton';
import { useInfiniteScroll } from 'utils/useInfiniteScroll';
import { EmptyData } from 'components/data';

const PostListPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentLanguage } = useStoreApp();
  const t = currentLanguage.value;

  const { data: categoryDetail } = useGetCategoryDetail(Number(id));
  const { data, isLoading, refetch, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetPostsListForScroll({ page: 1, size: 4, categoryId: Number(id) });

  const postsList = data?.pages?.reduce((acc, page) => [...acc, ...page], []) || [];

  const loaderRef = useInfiniteScroll({
    hasMore: hasNextPage,
    loading: isFetchingNextPage,
    onLoadMore: fetchNextPage,
  });

  const PostComponent = useMemo((): React.FC<PostComponentPropsType> => {
    if (categoryDetail) {
      return LAYOUT_COMPONENT_MAP[categoryDetail.zaloLayout] || NewsItem;
    }
    return NewsItem;
  }, [categoryDetail]);

  const gridColumn = useMemo(() => {
    if (categoryDetail) {
      return GRID_COLUMN_LAYOUT_MAP[categoryDetail.zaloLayout];
    }
    return 1;
  }, [categoryDetail]);

  const renderContent = () => {
    if (isLoading) {
      return [...Array(4)].map((_, idx) => (
        <Box mb={4} key={idx}>
          <PostSkeleton gridColumn={gridColumn} count={4} />
        </Box>
      ));
    }
    return <Box>
      <Box>
        {
          (postsList.length === 0 && !isFetchingNextPage && !isLoading) ? (
            <Box px={4}>
              <EmptyData title="Hiện chưa có danh sách về chuyên mục này!" desc="Vui lòng quay lại sau." />
            </Box>
          ) :
            (
              <>
                {
                  postsList.map((data: PostType, index: number) => {
                    return (
                      <Box mb={4} key={index}>
                        <PostComponent key={data.id} data={data} onClick={() => navigate(`/bai-viet/${data.id}`)} />
                      </Box>
                    );
                  })
                }
              </>
            )
        }
      </Box>
      <div ref={loaderRef} className="px-4 pt-4">
        {isFetchingNextPage && <PostSkeleton />}
        {postsList.length > 0 && !hasNextPage && <p className="text-center">Đã hiển thị tất cả</p>}
      </div>
    </Box>;
  }

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

          {/* <Box pb={4} px={4}>
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
          </Box> */}
          <Box px={4}>
            {renderContent()}
          </Box>
        </Box>
      </Box>
    </Page>
  );
};

export default PostListPage;
