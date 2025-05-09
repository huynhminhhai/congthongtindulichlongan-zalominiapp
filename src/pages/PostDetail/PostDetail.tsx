import { useAddFavorite, useRemoveFavorite } from 'apiRequest/favorites';
import { useGetPostDetail } from 'apiRequest/posts';
import { ActionButton, CommentSection, Rating, ShareInfor } from 'components/actions';
import { ItemDetailCard, TitleDetail, TitleSubDetail } from 'components/detail';
import { HeaderSub } from 'components/HeaderSub';
import { CategoryMap, SingleLocationMap } from 'components/maps';
import TitleSection from 'components/titleSection';
import React, { useEffect, useMemo, useState } from 'react';
import { useStoreApp } from 'store/store';
import { formatDate, formatImageSrc } from 'utils';
import { useCustomSnackbar } from 'utils/useCustomSnackbar';
import { Box, Page, useNavigate, useParams } from 'zmp-ui';

import SkeletonPostDetail from './SkeletonPostDetail';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showSuccess, showError } = useCustomSnackbar();
  const { mutateAsync: addFavorite } = useAddFavorite();
  const { mutateAsync: removeFavorite } = useRemoveFavorite();
  const { data: postDetailData, refetch } = useGetPostDetail(Number(id));

  const [isFavorite, setIsFavorite] = useState(false);
  const { currentLanguage, token, setIsLoginModalOpen } = useStoreApp();
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

  const processedContent = useMemo(() => {
    if (!postDetailData?.content) return '';
    return postDetailData.content.replace(/<img\s+[^>]*src="\/uploads\/images\/([^"]+)"[^>]*>/g, (match, filename) => {
      return match.replace(`/uploads/images/${filename}`, `https://dulich.vnpt.me/uploads/images/${filename}`);
    });
  }, [postDetailData]);
  const handleToggleFavorite = async () => {
    if (!postDetailData) return;
    if (!token) {
      setIsLoginModalOpen(true);
      return;
    }
    try {
      if (isFavorite) {
        await removeFavorite(postDetailData.id);
        showSuccess(t['AddFavoriteSuccess']);
      } else {
        await addFavorite(postDetailData.id);
        showSuccess(t['AddFavoriteSuccess']);
      }

      setIsFavorite(!isFavorite);
    } catch (error: any) {
      showError(error.message);
    }
  };

  useEffect(() => {
    if (postDetailData) {
      setIsFavorite(postDetailData.isFavorite);
    }
  }, [postDetailData]);

  useEffect(() => {
    if (token) {
      refetch();
    }
  }, [token]);
  return (
    <Page className="relative flex-1 flex flex-col bg-white">
      <Box>
        <HeaderSub title={t['PostDetail']} />
        {!postDetailData ? (
          <SkeletonPostDetail />
        ) : (
          <>
            <Box>
              <div className="fixed bottom-[50px] right-4 z-10">
                <ActionButton
                  icon="mdi:heart"
                  altText="Mục yêu thích"
                  isChecked={isFavorite}
                  onClick={handleToggleFavorite}
                />
              </div>
              <Box mb={2} className="relative">
                <img src={formatImageSrc(postDetailData?.image)} alt="" className="h-[250px] object-cover w-full" />
              </Box>
              <Box p={4}>
                <Box flex alignItems="flex-start" justifyContent="space-between" mb={5}>
                  <div className="mr-1">
                    <TitleDetail title={postDetailData?.title} />
                    {postDetailData?.dateCreated && (
                      <div className="text-[14px] mt-2 italic text-[#355933]">
                        {formatDate(postDetailData.dateCreated)}
                      </div>
                    )}
                  </div>
                </Box>

                <Box>
                  <TitleSubDetail title={t['Desc']} />
                  <div
                    className="detail-content"
                    dangerouslySetInnerHTML={{
                      __html: processedContent,
                    }}
                  ></div>
                </Box>
              </Box>
              {isMap && (
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
              {isComment && t['OpenCommentMini'] === 'true' && (
                <Box px={4} mb={4}>
                  <CommentSection postId={Number(id)} />
                </Box>
              )}
              <Box px={4} mb={4}>
                <ShareInfor postDetail={postDetailData} />
              </Box>
            </Box>

            <Box px={4} mb={4}>
              {isRating && <Rating postId={Number(id)} vote={postDetailData?.vote} />}
            </Box>
            <Box px={4} pb={10}>
              <TitleSection title={t['RelatedPost']} mB={2} />
              <Box pt={4} pb={4}>
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

export default PostDetail;
