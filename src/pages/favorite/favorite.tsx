import { Skeleton } from 'antd';
import { useRemoveFavorite } from 'apiRequest/favorites';
import { useGetFavoritePosts } from 'apiRequest/posts';
import { EmptyData } from 'components/data';
import { FavoriteItem } from 'components/favorite';
import { HeaderSub } from 'components/header-sub';
import React, { useEffect } from 'react';
import { useStoreApp } from 'store/store';
import { useCustomSnackbar } from 'utils/useCustomSnackbar';
import { useInfiniteScroll } from 'utils/useInfiniteScroll';
import { Box, Page, Select } from 'zmp-ui';

const FavoriteItemSkeleton = () => {
  return (
    <Box className="rounded-xl border border-gray-200 overflow-hidden bg-white p-4">
      <Skeleton.Image className="!w-full" style={{ width: '100%', height: 140, borderRadius: 8 }} active />
      <Skeleton active title={{ width: '70%' }} paragraph={{ rows: 1, width: ['50%'] }} className="mt-2 p-2" />
    </Box>
  );
};
const FavoritePage = () => {
  const { Option } = Select;
  const { currentLanguage, setIsLoginModalOpen, token } = useStoreApp();
  const t = currentLanguage.value;
  const { data, isLoading, refetch, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetFavoritePosts(
    {
      page: 1,
      size: 4,
    },
    {
      enabled: !!token,
    }
  );

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
      return [...Array(4)].map((_, idx) => (
        <Box mb={4} key={idx}>
          <FavoriteItemSkeleton />
        </Box>
      ));
    }
    return <Box>
      <Box>
        {
          (favoritePosts.length === 0 && !isFetchingNextPage && !isLoading) ? (
            <Box px={4}>
              <EmptyData title="Hiện chưa có mục yêu thích nào!" desc={token ? `Bạn có thể thêm mục yêu thích để có thể tương tác tại đây. Vui lòng quay lại sau.` : `Vui lòng đăng nhập để thêm mục yêu thích.`} />
            </Box>
          ) :
            (
              <>
                {
                  favoritePosts.map((item, index) => {
                    const fvr = item.post;
                    return (
                      <Box mb={3} key={index}>
                        <FavoriteItem
                          id={fvr.id}
                          image={fvr.image}
                          title={fvr.title}
                          category={fvr.category}
                          onCancel={() => handleToggleFavorite(fvr.id)}
                        />
                      </Box>
                    );
                  })
                }
              </>
            )
        }
      </Box>
      <div ref={loaderRef} className="px-4">
        {isFetchingNextPage && <FavoriteItemSkeleton />}
        {favoritePosts.length > 0 && !hasNextPage && <p className="text-center">Đã hiển thị tất cả mục yêu thích</p>}
      </div>
    </Box>;
  }

  return (
    <Page className="relative flex-1 flex flex-col bg-white pb-[72px]">
      <Box>
        <HeaderSub title={t['ZaloFavorites']} />
        <Box mt={3}>
          {/* <Box>
            <FilterBar showAddButton={false} searchComponent={<Input.Search placeholder={t['Search']} value={''} />}>
              <div className="col-span-12">
                <Select placeholder="Danh mục" closeOnSelect>
                  <Option title={'Tất cả'} value={0} />
                  <Option title={'Nổi tiếng'} value={1} />
                </Select>
              </div>
            </FilterBar>
          </Box> */}
          <Box px={4}>
            {/* {isLoading
              ? [...Array(4)].map((_, idx) => (
                <Box mb={6} key={idx}>
                  <FavoriteItemSkeleton />
                </Box>
              ))
              : favoritePosts?.map((item, index) => {
                const fvr = item.post;
                return (
                  <Box mb={6} key={index}>
                    <FavoriteItem
                      id={fvr.id}
                      image={fvr.image}
                      title={fvr.title}
                      category={fvr.category}
                      onCancel={() => handleToggleFavorite(fvr.id)}
                    />
                  </Box>
                );
              })} */}
            {renderContent()}
          </Box>
        </Box>
      </Box>
    </Page>
  );
};

export default FavoritePage;
