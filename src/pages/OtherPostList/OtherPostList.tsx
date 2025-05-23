import { useGetCategoryDetail } from 'apiRequest/categories';
import { useGetPostsListForScroll } from 'apiRequest/posts';
import { PostType } from 'apiRequest/posts/types';
import { EmptyData } from 'components/data';
import { FilterBar } from 'components/FilterBar';
import { HeaderSub } from 'components/HeaderSub';
import { NewsItem } from 'components/PostComponent/NewsItem';
import { OtherPostComponent } from 'components/PostComponent/OtherPostComponent';
import { debounce } from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStoreApp } from 'store/store';
import { GRID_COLUMN_LAYOUT_MAP, LAYOUT_COMPONENT_MAP, PostComponentPropsType } from 'utils/constants';
import { useInfiniteScroll } from 'utils/useInfiniteScroll';
import { Box, Input, Page } from 'zmp-ui';

import PostSkeleton from './OtherPostListSkeleton';

const OtherPostList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentLanguage } = useStoreApp();
  const t = currentLanguage.value;
  const [searchText, setSearchText] = useState('');

  const [param, setParam] = useState({
    page: 1,
    size: 10,
    categoryId: Number(id),
    search: searchText,
  });

  useEffect(() => {
    const handler = debounce((value: string) => {
      setParam(prev => ({
        ...prev,
        search: value,
        page: 1,
      }));
    }, 300);

    handler(searchText);

    return () => {
      handler.cancel();
    };
  }, [searchText]);

  const { data: categoryDetail } = useGetCategoryDetail(Number(id));
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetPostsListForScroll(param);

  const postsList = data?.pages?.reduce((acc, page) => [...acc, ...page.items], []) || [];

  const loaderRef = useInfiniteScroll({
    hasMore: hasNextPage,
    loading: isFetchingNextPage,
    onLoadMore: fetchNextPage,
  });

  const gridColumn = useMemo(() => {
    if (categoryDetail) {
      return GRID_COLUMN_LAYOUT_MAP[categoryDetail.zaloLayout] || 1;
    }
    return 1;
  }, [categoryDetail]);

  const PostComponent = useMemo((): React.FC<PostComponentPropsType> => {
    if (categoryDetail) {
      return LAYOUT_COMPONENT_MAP[categoryDetail.zaloLayout] || LAYOUT_COMPONENT_MAP['Default'];
    }
    return NewsItem;
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
              <EmptyData title={t['NoDataForThisCategory']} desc={t['PleaseComeBackLater']} />
            </Box>
          ) : (
            <div className={`grid gap-4 grid-cols-${gridColumn}`}>
              {postsList.map((data: PostType, index: number) => {
                return (
                  <Box key={index} className="w-full">
                    <PostComponent key={data.id} data={data} onClick={() => navigate(`/bai-viet-khac/${data.id}`)} />
                  </Box>
                );
              })}
            </div>
          )}
        </Box>

        <div ref={loaderRef} className="px-4 pt-4">
          {isFetchingNextPage && <PostSkeleton count={1} />}
          {postsList.length > 0 && !hasNextPage && <p className="text-center">{t['AllDisplayed']}</p>}
        </div>
      </Box>
    );
  };

  return (
    <Page className="relative flex-1 flex flex-col bg-white">
      <Box>
        <HeaderSub title={categoryDetail?.name || '...'} onBackClick={() => navigate('/')} />
        <Box pb={4}>
          <FilterBar
            showFilter={false}
            showAddButton={false}
            searchComponent={
              <Input.Search
                placeholder={t['Search']}
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
              />
            }
          >
            {/* <div className="col-span-12">
                <Select placeholder={tCommon('all')} closeOnSelect>
                  <Option title={tCommon('all')} value={0} />
                </Select>
              </div> */}
          </FilterBar>

          <Box px={4}>{renderContent()}</Box>
        </Box>
      </Box>
    </Page>
  );
};

export default OtherPostList;
