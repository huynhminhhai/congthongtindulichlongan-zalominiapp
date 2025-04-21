import { useGetListImageAlbums } from 'apiRequest/album';
import { EmptyData } from 'components/data';
import { GalleryItem, GalleryItemSkeleton } from 'components/GalleryItem';
import { HeaderSub } from 'components/HeaderSub';
import { debounce } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStoreApp } from 'store/store';
import { useInfiniteScroll } from 'utils/useInfiniteScroll';
import { Box, Input, Page } from 'zmp-ui';

const GalleryPage = () => {
  const navigate = useNavigate();
  const { currentLanguage } = useStoreApp();
  const t = currentLanguage.value;
  const [searchText, setSearchText] = useState('');

  const [param, setParam] = useState({
    page: 1,
    size: 10,
  });
  const {
    data: galleryData,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetListImageAlbums({
    ...param,
  });

  const galleryList = galleryData?.pages?.reduce((acc, page) => [...acc, ...page.items], []) || [];

  const loaderRef = useInfiniteScroll({
    hasMore: hasNextPage,
    loading: isFetchingNextPage,
    onLoadMore: fetchNextPage,
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

  return (
    <Page className="relative flex-1 flex flex-col bg-white">
      <Box>
        <HeaderSub title={t['AlbumTitleOnDetail']} />
        <Box px={4} pb={4}>
          <div className="mb-4">
            <Input.Search
              className="h-[46px] !border-0"
              value={searchText}
              placeholder={t['Search']}
              onChange={e => setSearchText(e.target.value)}
            />
          </div>
          <Box flex flexDirection="column">
            {isLoading &&
              [...Array(param.size)].map((_, idx) => (
                <Box mb={4} key={idx}>
                  <GalleryItemSkeleton />
                </Box>
              ))}
            {galleryList &&
              (galleryList.length > 0 ? (
                galleryList.map((item, index) => {
                  return (
                    <Box mb={4} key={index}>
                      <GalleryItem data={item} onClick={() => navigate(`/gallery-detail/${item.id}`)} />
                    </Box>
                  );
                })
              ) : (
                <EmptyData title={t['NoResultsFound']} />
              ))}
          </Box>

          <div ref={loaderRef} className="px-4">
            {isFetchingNextPage &&
              [...Array(param.size)].map((_, idx) => (
                <Box mb={4} key={idx}>
                  <GalleryItemSkeleton />
                </Box>
              ))}
            {galleryList.length > 0 && !hasNextPage && <p className="text-center">{t['AllDisplayed']}</p>}
          </div>
        </Box>
      </Box>
    </Page>
  );
};

export default GalleryPage;
