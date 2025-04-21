import { Skeleton } from 'antd';
import { useGetCategoryList } from 'apiRequest/categories';
import { useRemoveFavorite } from 'apiRequest/favorites';
import { useGetFavoritePosts } from 'apiRequest/posts';
import { EmptyData } from 'components/data';
import { FavoriteItem } from 'components/favorite';
import { HeaderSub } from 'components/header-sub';
import { FilterBar } from 'components/table';
import { debounce } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStoreApp } from 'store/store';
import { useCustomSnackbar } from 'utils/useCustomSnackbar';
import { useInfiniteScroll } from 'utils/useInfiniteScroll';
import { Box, Input, Page, Select } from 'zmp-ui';

const FavoriteItemSkeleton = () => {
  return (
    <Box className="rounded-xl border border-gray-200 overflow-hidden bg-white p-4">
      <Skeleton.Image className="!w-full" style={{ width: '100%', height: 140, borderRadius: 8 }} active />
      <Skeleton active title={{ width: '70%' }} paragraph={{ rows: 1, width: ['50%'] }} className="mt-2 p-2" />
    </Box>
  );
};
const FavoritePage = () => {
  const navigate = useNavigate();
  const { data: categoriesList } = useGetCategoryList();

  const [activeCate, setActiveCate] = useState<number | undefined>(0);
  const [searchText, setSearchText] = useState('');

  const [param, setParam] = useState({
    searchByParentCate: true,
    page: 1,
    size: 10,
  });
  const { Option } = Select;
  const { currentLanguage, setIsLoginModalOpen, token } = useStoreApp();
  const t = currentLanguage.value;

  const { data, isLoading, refetch, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetFavoritePosts(
    { ...param, categoryId: activeCate || undefined, search: searchText },
    {
      enabled: !!token,
    }
  );

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

  const favoritePosts = data?.pages?.reduce((acc, page) => [...acc, ...page], []) || [];

  const loaderRef = useInfiniteScroll({
    hasMore: hasNextPage,
    loading: isFetchingNextPage,
    onLoadMore: fetchNextPage,
  });

  const { showError, showSuccess } = useCustomSnackbar();

  const { mutateAsync: removeFavorite } = useRemoveFavorite();
  const handleToggleFavorite = async id => {
    if (!id) return;
    try {
      await removeFavorite(id);
      await refetch();
      showSuccess(t['RemoveFavoriteSuccess']);
    } catch (error: any) {
      showError(t['RemoveFavoriteSuccess']);
    }
  };

  useEffect(() => {
    if (!token) {
      setIsLoginModalOpen(true);
    }
  }, [token]);

  const renderContent = () => {
    if (isLoading) {
      return [...Array(param.size)].map((_, idx) => (
        <Box mb={4} key={idx}>
          <FavoriteItemSkeleton />
        </Box>
      ));
    }
    return (
      <Box>
        <Box>
          {favoritePosts.length === 0 && !isFetchingNextPage && !isLoading ? (
            <div className="mt-[50px] px-4">
              <EmptyData
                title={t['NoFavoritesYet']}
                desc={
                  token ? (
                    t['FavoriteWhenLoggedIn']
                  ) : (
                    <>
                      {t['Please']}{' '}
                      <span className="text-[#355933] font-semibold" onClick={() => setIsLoginModalOpen(true)}>
                        {t['Login']}
                      </span>{' '}
                      {t['ToAddFavorite']}
                    </>
                  )
                }
              />
            </div>
          ) : (
            <>
              {favoritePosts.map((item, index) => {
                const fvr = item.post;
                return (
                  <Box mb={3} key={index}>
                    <FavoriteItem
                      id={fvr.id}
                      image={fvr.image}
                      title={fvr.title}
                      categories={fvr.categories}
                      onCancel={() => handleToggleFavorite(fvr.id)}
                      onClick={() => navigate(`/bai-viet/${fvr.id}`)}
                    />
                  </Box>
                );
              })}
            </>
          )}
        </Box>
        <div ref={loaderRef} className="px-4">
          {isFetchingNextPage && <FavoriteItemSkeleton />}
          {favoritePosts.length > 0 && !hasNextPage && <p className="text-center">{t['DisplayedAllFavorites']}</p>}
        </div>
      </Box>
    );
  };

  return (
    <Page className="relative flex-1 flex flex-col bg-white pb-[72px]">
      <Box>
        <HeaderSub title={t['ZaloFavorites']} />
        <Box mt={3}>
          <Box>
            <FilterBar
              showAddButton={false}
              searchComponent={
                <Input.Search
                  className="h-[46px] !border-0"
                  value={searchText}
                  placeholder={t['Search']}
                  onChange={e => setSearchText(e.target.value)}
                />
              }
            >
              <div className="col-span-12">
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
              </div>
            </FilterBar>
          </Box>
          <Box px={4}>{renderContent()}</Box>
        </Box>
      </Box>
    </Page>
  );
};

export default FavoritePage;
