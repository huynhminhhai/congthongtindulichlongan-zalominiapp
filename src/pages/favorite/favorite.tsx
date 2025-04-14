import { Skeleton } from 'antd';
import { useRemoveFavorite } from 'apiRequest/favorites';
import { useGetFavoritePosts } from 'apiRequest/posts';
import { Divider } from 'components/divider';
import { FavoriteItem } from 'components/favorite';
import { FavoriteItemType } from 'components/favorite/FavoriteItem';
import { HeaderSub } from 'components/header-sub';
import FilterBar from 'components/table/FilterBar';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getDataFromStorage } from 'services/zalo';
import { useStoreApp } from 'store/store';
import { useCustomSnackbar } from 'utils/useCustomSnackbar';
import { Box, Input, Page, Select, useSnackbar } from 'zmp-ui';

const FavoriteItemSkeleton = () => {
  return (
    <div className="flex gap-4">
      <Skeleton.Image style={{ width: 100, height: 100 }} active />
      <div className="flex-1">
        <Skeleton active paragraph={{ rows: 2 }} title={{ width: '80%' }} />
      </div>
    </div>
  );
};
const FavoritePage = () => {
  const { Option } = Select;
  const { currentLanguage, setIsLoginModalOpen, token } = useStoreApp();
  const t = currentLanguage.value;
  const { data, isLoading, refetch } = useGetFavoritePosts(
    {
      page: 1,
      size: 10,
    },
    {
      enabled: !!token,
    }
  );
  const favoritePosts = data?.pages[0]?.items || [];
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
  return (
    <Page className="relative flex-1 flex flex-col bg-white pb-[62px]">
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
            {isLoading
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
                })}
          </Box>
        </Box>
      </Box>
    </Page>
  );
};

export default FavoritePage;
