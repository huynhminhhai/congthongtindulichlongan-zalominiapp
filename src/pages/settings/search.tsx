import { useGetCategoryList } from 'apiRequest/categories';
import { useGetPostsListForScroll } from 'apiRequest/posts';
import { EmptyData } from 'components/data';
import { ItemDetailCard, ItemDetailCardSkeleton } from 'components/detail';
import { HeaderSub } from 'components/header-sub';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStoreApp } from 'store/store';
import { useInfiniteScroll } from 'utils/useInfiniteScroll';
import { Box, Input, Page, Select } from 'zmp-ui';

const { Option } = Select;

const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeCate, setActiveCate] = useState<number | undefined>(0);
  const [param, setParam] = useState({
    searchByParentCate: true,
    page: 1,
    size: 10,
    search: '',
  });
  const { currentLanguage } = useStoreApp();
  const t = currentLanguage.value;
  const { data: categoriesList } = useGetCategoryList();
  const {
    data: postsListData,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetPostsListForScroll({
    ...param,
    categoryId: activeCate || undefined,
  });

  const postsList = postsListData?.pages?.reduce((acc, page) => [...acc, ...page.items], []) || [];

  const loaderRef = useInfiniteScroll({
    hasMore: hasNextPage,
    loading: isFetchingNextPage,
    onLoadMore: fetchNextPage,
  });
  return (
    <Page className="relative flex-1 flex flex-col bg-white pb-[66px]">
      <Box>
        <HeaderSub title={t['QuickSearch']} />
        <Box p={4}>
          <Box mb={2}>
            <Input.Search
              className="h-[46px] !border-0"
              focused
              placeholder={t['Search']}
              onSearch={text => setParam(prev => ({ ...prev, search: text }))}
            />
          </Box>
          <Box>
            <Select
              defaultValue={0}
              closeOnSelect
              placeholder={t['SelectAllSearch']}
              value={activeCate}
              onChange={value => setActiveCate(Number(value))}
              className="h-[46px] !border-0"
            >
              <Option value={0} title={t['SelectAllSearch']} />

              {categoriesList &&
                categoriesList.map((item, index) => (
                  <Option key={index} value={Number(item.value)} title={item.text} />
                ))}
            </Select>
          </Box>

          <div className="text-[16px] leading-[1] font-semibold my-3">
            {t['Result']} ({postsListData?.pages[0].total || 0})
          </div>
          <Box flex flexDirection="column" className="gap-3">
            {isLoading &&
              [...Array(param.size)].map((_, idx) => (
                <Box mb={4} key={idx}>
                  <ItemDetailCardSkeleton />
                </Box>
              ))}
            {postsList &&
              (postsList.length > 0 ? (
                postsList.map(item => {
                  const cateSummary = item.categories.map(cate => cate.name).join(', ');
                  return (
                    <ItemDetailCard
                      title={item.title}
                      imgUrl={item.image}
                      desc={cateSummary}
                      onClick={() => navigate(`/bai-viet/${item.id}`)}
                    />
                  );
                })
              ) : (
                <EmptyData title="Không tìm thấy kết quả" />
              ))}
          </Box>
          <div ref={loaderRef} className="px-4 pt-4">
            {isFetchingNextPage &&
              [...Array(param.size)].map((_, idx) => (
                <Box mb={4} key={idx}>
                  <ItemDetailCardSkeleton />
                </Box>
              ))}
            {postsList.length > 0 && !hasNextPage && <p className="text-center">Đã hiển thị tất cả</p>}
          </div>
        </Box>
      </Box>
    </Page>
  );
};

export default SearchPage;
