import { useGetCategoryDetail } from 'apiRequest/categories';
import { useGetPostsListForScroll } from 'apiRequest/posts';
import { PostType } from 'apiRequest/posts/types';
import { EmptyData } from 'components/data';
import { HeaderSub } from 'components/header-sub';
import { NewsItem } from 'components/PostComponent/news';
import { FilterBar } from 'components/table';
import { debounce } from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStoreApp } from 'store/store';
import { GRID_COLUMN_LAYOUT_MAP, LAYOUT_COMPONENT_MAP, PostComponentPropsType } from 'utils/constants';
import { useInfiniteScroll } from 'utils/useInfiniteScroll';
import { Box, Input, Page } from 'zmp-ui';

import PostSkeleton from './postListSkeleton';

const PostListPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentLanguage } = useStoreApp();
  const t = currentLanguage.value;

  const [filters, setFilters] = useState({
    search: '',
  });

  const [param, setParam] = useState({
    page: 1,
    size: 10,
    categoryId: Number(id),
    // search: '',
  });

  const updateFilter = (key: keyof typeof filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const useDebouncedParam = (value: string, key: keyof typeof param) => {
    useEffect(() => {
      const handler = debounce((v: string) => {
        setParam(prev => ({ ...prev, [key]: v }));
      }, 300);

      handler(value);

      return () => handler.cancel();
    }, [value, key]);
  };

  // useDebouncedParam(filters.search, 'search');

  const { data: categoryDetail } = useGetCategoryDetail(Number(id));
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetPostsListForScroll(param);

  const postsList = data?.pages?.reduce((acc, page) => [...acc, ...page.items], []) || [];

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
      return (
        <Box mb={4}>
          <PostSkeleton gridColumn={gridColumn} count={param.size} />
        </Box>
      );
    }

    return (
      <Box>
        <Box>
          {postsList.length === 0 && !isFetchingNextPage && !isLoading ? (
            <Box px={4}>
              <EmptyData title="Hiện chưa có danh sách về chuyên mục này!" desc="Vui lòng quay lại sau." />
            </Box>
          ) : (
            <div className={`grid gap-4 grid-cols-${gridColumn}`}>
              {postsList.map((data: PostType, index: number) => {
                return (
                  <Box mb={4} key={index}>
                    <PostComponent key={data.id} data={data} onClick={() => navigate(`/bai-viet/${data.id}`)} />
                  </Box>
                );
              })}
            </div>
          )}
        </Box>

        <div ref={loaderRef} className="px-4 pt-4">
          {isFetchingNextPage && <PostSkeleton count={1} />}
          {postsList.length > 0 && !hasNextPage && <p className="text-center">Đã hiển thị tất cả</p>}
        </div>
      </Box>
    );
  };

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
          <Box px={4}>{renderContent()}</Box>
        </Box>
      </Box>
    </Page>
  );
};

export default PostListPage;
