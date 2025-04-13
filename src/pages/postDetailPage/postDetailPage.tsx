import { useAddFavorite, useRemoveFavorite } from 'apiRequest/favorites';
import { useGetPostDetail } from 'apiRequest/posts';
import { ActionButton, CommentSection, Rating, ShareInfor } from 'components/actions';
import { ItemDetailCard, TitleDetail, TitleSubDetail } from 'components/detail';
import { HeaderSub } from 'components/header-sub';
import { CategoryMap, SingleLocationMap } from 'components/maps';
import { ImageGallery } from 'components/slider';
import TitleSection from 'components/titleSection';
import React, { useEffect, useMemo, useState } from 'react';
import { HttpError } from 'services/http';
import { useStoreApp } from 'store/store';
import { formatImageSrc } from 'utils';
import { messageError } from 'utils/AntdMessage';
import { Box, Page, useNavigate, useParams, useSnackbar } from 'zmp-ui';

import SkeletonPostDetailPage from './skeletonPostDetailPage';

const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { openSnackbar } = useSnackbar();
  const { mutateAsync: addFavorite } = useAddFavorite();
  const { mutateAsync: removeFavorite } = useRemoveFavorite();
  const { data: postDetailData } = useGetPostDetail(Number(id));
  const [isFavorite, setIsFavorite] = useState(false);
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
  useEffect(() => {
    if (postDetailData) {
      setIsFavorite(postDetailData.isFavorite);
    }
  }, [postDetailData]);
  const handleToggleFavorite = async () => {
    if (!postDetailData) return;
    try {
      if (isFavorite) {
        await removeFavorite(postDetailData.id);
      } else {
        await addFavorite(postDetailData.id);
      }
      setIsFavorite(!isFavorite);
    } catch (error: any) {
      openSnackbar({
        icon: true,
        text: error.message,
        type: 'error',
        action: { text: 'Đóng', close: true },
        duration: 3000,
      });
    }
  };
  return (
    <Page className="relative flex-1 flex flex-col bg-white">
      <Box>
        <HeaderSub title={t.PostDetail} />
        {!postDetailData ? (
          <SkeletonPostDetailPage />
        ) : (
          <>
            <Box>
              <Box mb={2} className="relative">
                <img src={formatImageSrc(postDetailData?.image)} alt="" className="h-[250px] object-cover w-full" />
                <ActionButton
                  className="absolute bottom-0 translate-y-[50%] right-5"
                  icon="mdi:heart"
                  altText="Mục yêu thích"
                  isChecked={isFavorite}
                  onClick={handleToggleFavorite}
                />
              </Box>
              <Box p={4}>
                <Box mb={3} flex alignItems="flex-end" justifyContent="space-between" className="gap-2">
                  <TitleDetail title={postDetailData?.title} />
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
