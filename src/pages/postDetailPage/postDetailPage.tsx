import { useGetPostDetail } from 'apiRequest/posts';
import { ActionButton, CommentSection, Rating, ShareInfor } from 'components/actions';
import { ItemDetailCard, TitleDetail, TitleSubDetail } from 'components/detail';
import { HeaderSub } from 'components/header-sub';
import { CategoryMap, SingleLocationMap } from 'components/maps';
import { ImageGallery } from 'components/slider';
import TitleSection from 'components/titleSection';
import React, { useMemo } from 'react';
import { useStoreApp } from 'store/store';
import { formatImageSrc } from 'utils';
import { Box, Page, useNavigate, useParams } from 'zmp-ui';

import SkeletonPostDetailPage from './skeletonPostDetailPage';

export const imagesGallery = [
  'https://ik.imagekit.io/tvlk/blog/2023/11/nha-tram-cot-1.jpg?tr=q-70,c-at_max,w-500,h-300,dpr-2',
  'https://ik.imagekit.io/tvlk/blog/2023/11/nha-tram-cot-9-1024x768.jpg?tr=q-70,c-at_max,w-500,h-300,dpr-2',
  'https://ik.imagekit.io/tvlk/blog/2023/11/nha-tram-cot-cover.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3tPApPFReu540fGsIOTdoHg1nm9PcK9l_rg&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQbW-K2nSZpaY7Uo6J9B4RjauteSGq9PC8G7hPljfEHloZo8QEvF4qvylgXP-XI2kOvjk&usqp=CAU',
  'https://image.sggp.org.vn/w1000/Uploaded/2025/dureixrxkw/2019_02_02/nha-tram-cot_1_sggp_HJCU.jpg.webp',
];

const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: postDetailData } = useGetPostDetail(Number(id));
  const { currentLanguage } = useStoreApp();
  const t = currentLanguage.value;
  const { isRating, isMap, isComment } = useMemo(() => {
    if (postDetailData) {
      const isRating = postDetailData.categories.some(cat => cat.isRating);
      const isMap = postDetailData.categories.some(cat => cat.isMap);
      const isComment = postDetailData.categories.some(cat => cat.isComment);
      return { isRating, isMap, isComment };
    }
    return { isRating: false, isMap: false, isComment: false };
  }, [postDetailData]);

  return (
    <Page className="relative flex-1 flex flex-col bg-white">
      <Box>
        <HeaderSub title={t.PostDetail} />
        {!postDetailData ? (
          <SkeletonPostDetailPage />
        ) : (
          <>
            <Box>
              <Box mb={2}>
                <img src={formatImageSrc(postDetailData?.image)} alt="" className="h-[250px] object-cover w-full" />
              </Box>
              <Box p={4}>
                <Box mb={3} flex alignItems="flex-end" justifyContent="space-between" className="gap-2">
                  <TitleDetail title={postDetailData?.title} />
                  <ActionButton
                    icon="mdi:heart"
                    altText="Mục yêu thích"
                    isChecked={true}
                    onClick={() => console.log('call api favorite')}
                  />
                </Box>

                <Box>
                  <TitleSubDetail title={t.Desc} />
                  <div
                    className="detail-content"
                    dangerouslySetInnerHTML={{
                      __html: postDetailData?.content,
                    }}
                  ></div>
                </Box>
              </Box>
              {isMap && (
                <Box p={4} mb={4}>
                  <TitleSubDetail title={t.Map} />
                  <div className="infor-map">
                    {postDetailData?.maps && postDetailData?.maps.length > 0 ? (
                      postDetailData?.maps.length === 1 ? (
                        <SingleLocationMap location={postDetailData.maps[0]} />
                      ) : (
                        <CategoryMap locations={postDetailData.maps} />
                      )
                    ) : (
                      'Dữ liệu đang được cập nhật...'
                    )}
                  </div>
                </Box>
              )}
              {isComment && (
                <Box px={4} mb={4}>
                  <CommentSection itemId={1} />
                </Box>
              )}
              <Box px={4} mb={4}>
                <ShareInfor />
              </Box>
            </Box>

            <Box px={4} mb={4}>
              {isRating && (
                <Rating
                  averageRating={postDetailData?.averageRating}
                  totalReviews={postDetailData?.totalVotes}
                  ratingDistribution={{
                    5: postDetailData.ratingDistribution[4],
                    4: postDetailData.ratingDistribution[3],
                    3: postDetailData.ratingDistribution[2],
                    2: postDetailData.ratingDistribution[1],
                    1: postDetailData.ratingDistribution[0],
                  }}
                  onRate={rating => console.log('Người dùng chọn:', rating)}
                />
              )}
            </Box>
            <Box px={4} pb={4}>
              <TitleSection title={t.RelatedPost} mB={2} />
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

export default PostDetailPage;
