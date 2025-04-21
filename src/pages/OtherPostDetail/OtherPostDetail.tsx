import { Flex } from 'antd';
import { useAddFavorite, useRemoveFavorite } from 'apiRequest/favorites';
import { useGetPostDetail } from 'apiRequest/posts';
import { ActionButton, CommentSection, Rating, ShareInfor } from 'components/actions';
import { ItemDetailCard, TitleDetail, TitleSubDetail } from 'components/detail';
import { HeaderSub } from 'components/HeaderSub';
import { CategoryMap, SingleLocationMap } from 'components/maps';
import BusMap from 'components/maps/BusMap';
import TitleSection from 'components/titleSection';
import React, { useEffect, useMemo, useState } from 'react';
import { useStoreApp } from 'store/store';
import { formatDate, formatImageSrc } from 'utils';
import { useCustomSnackbar } from 'utils/useCustomSnackbar';
import { Box, Page, useNavigate, useParams, useSnackbar } from 'zmp-ui';

import SkeletonPostDetail from './SkeletonPostDetail';

const OtherPostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: postDetailData } = useGetPostDetail(Number(id));

  const { currentLanguage } = useStoreApp();
  const t = currentLanguage.value;
  const { isBusMap } = useMemo(() => {
    if (postDetailData) {
      const isBusMap = postDetailData.categories.some(cat => cat.zaloLayout === 'TuyenXePage');

      return { isBusMap };
    }
    return { isRating: false, isMap: false, isComment: false };
  }, [postDetailData]);

  return (
    <Page className="relative flex-1 flex flex-col bg-white">
      <Box>
        <HeaderSub title={t['PostDetail']} />
        {!postDetailData ? (
          <SkeletonPostDetail />
        ) : (
          <>
            <Box>
              <Box mb={2} className="relative">
                <img src={formatImageSrc(postDetailData?.image)} alt="" className="h-[250px] object-cover w-full" />
              </Box>
              <Box p={4}>
                <Box flex alignItems="flex-start" justifyContent="space-between">
                  <div className="mr-1">
                    <TitleDetail title={postDetailData?.title} />
                    {postDetailData?.dateCreated && (
                      <div className="text-[14px] mt-2 italic text-[#355933]">
                        {formatDate(postDetailData.dateCreated)}
                      </div>
                    )}
                  </div>
                </Box>
              </Box>
              {isBusMap ? (
                <Box p={4} mb={4}>
                  <BusMap busStops={postDetailData.postMaps} />
                </Box>
              ) : (
                <Box p={4} mb={4}>
                  <TitleSubDetail title={t['Map']} />
                  <div className="infor-map">
                    {postDetailData?.postMaps && postDetailData?.postMaps.length > 0 ? (
                      postDetailData?.postMaps.length === 1 ? (
                        <SingleLocationMap location={postDetailData.postMaps[0]} />
                      ) : (
                        <CategoryMap locations={postDetailData.postMaps} />
                      )
                    ) : (
                      t['MessageUpdate']
                    )}
                  </div>
                </Box>
              )}

              <Box px={4} mb={4}>
                <ShareInfor postDetail={postDetailData} />
              </Box>
            </Box>

            <Box px={4} pb={4}>
              <TitleSection title={t['RelatedPost']} mB={2} />
              <Box pt={4}>
                <div className="grid grid-cols-1 gap-3">
                  {postDetailData?.relatedPosts &&
                    postDetailData.relatedPosts.map((item, index) => (
                      <Box key={index} onClick={() => navigate(`/bai-viet/${item.id}`)}>
                        <ItemDetailCard imgUrl={item.image} title={item.title} desc={item.summary} />
                      </Box>
                    ))}
                </div>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Page>
  );
};

export default OtherPostDetail;
