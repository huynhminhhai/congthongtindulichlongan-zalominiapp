import { Icon } from '@iconify/react';
import { useGetPostDetail } from 'apiRequest/posts';
import images from 'assets/images';
import { ActionButton, CommentSection, Rating, ShareInfor } from 'components/actions';
import { ItemDetailCard, TitleDetail, TitleSubDetail } from 'components/detail';
import { HeaderSub } from 'components/header-sub';
import { SingleLocationMap } from 'components/maps';
import { ImageGallery } from 'components/slider';
import TitleSection from 'components/titleSection';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useStoreApp } from 'store/store';
import { DIA_DIEM_DU_LICH_DATA } from 'utils/data';
import { Box, Page, useNavigate, useParams } from 'zmp-ui';

export const imagesGallery = [
  'https://ik.imagekit.io/tvlk/blog/2023/11/nha-tram-cot-1.jpg?tr=q-70,c-at_max,w-500,h-300,dpr-2',
  'https://ik.imagekit.io/tvlk/blog/2023/11/nha-tram-cot-9-1024x768.jpg?tr=q-70,c-at_max,w-500,h-300,dpr-2',
  'https://ik.imagekit.io/tvlk/blog/2023/11/nha-tram-cot-cover.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3tPApPFReu540fGsIOTdoHg1nm9PcK9l_rg&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQbW-K2nSZpaY7Uo6J9B4RjauteSGq9PC8G7hPljfEHloZo8QEvF4qvylgXP-XI2kOvjk&usqp=CAU',
  'https://image.sggp.org.vn/w1000/Uploaded/2025/dureixrxkw/2019_02_02/nha-tram-cot_1_sggp_HJCU.jpg.webp',
];

const location = {
  lat: 10.482655336277755,
  lng: 106.69146306623148,
  name: 'Nhà Trăm Cột',
  address: ' Ấp Cầu Ngang, Xã Long Hựu Đông, Huyện Cần Đước, Tỉnh Long An',
  img: 'https://ik.imagekit.io/tvlk/blog/2023/11/nha-tram-cot-cover.jpg',
  markerImg: images.markerTravel,
};

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
  if (!postDetailData) {
    return <></>;
  }
  return (
    <Page className="relative flex-1 flex flex-col bg-white">
      <Box>
        <HeaderSub title={t.PostDetail} />
        <Box>
          <Box mb={2}>
            <ImageGallery images={imagesGallery} />
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
            <Box mb={9}>
              {/* <TitleSubDetail title={tPage('infor')} /> */}
              {/* <Box>
                <ul className="flex flex-col gap-3 font-medium">
                  <li className="flex items-start gap-2">
                    <Icon fontSize={24} icon="fluent:location-28-regular" />
                    <div className="flex-1">Ấp Cầu Ngang, Xã Long Hựu Đông, Huyện Cần Đước, Tỉnh Long An</div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon fontSize={24} icon="material-symbols-light:mail-outline" />
                    <div className="flex-1">dulichthongminh.longan@gmail.com</div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon fontSize={24} icon="mdi-light:phone" />
                    <div className="flex-1">0397455789</div>
                  </li>
                </ul>
              </Box> */}
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
                <SingleLocationMap location={location} />
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
              averageRating={4.2}
              totalReviews={100}
              ratingDistribution={{ 5: 50, 4: 30, 3: 10, 2: 5, 1: 5 }}
              onRate={rating => console.log('Người dùng chọn:', rating)}
            />
          )}
        </Box>
        <Box px={4} pb={4}>
          <TitleSection title={t.RelatedPost} mB={2} handleClick={() => navigate('/bai-viet')} />
          <Box pt={4}>
            <div className="grid grid-cols-1 gap-3">
              {postDetailData.relatedPosts.map((item, index) => (
                <Box key={index} onClick={() => navigate(`/bai-viet/${item.id}`)}>
                  <ItemDetailCard imgUrl={item.image} title={item.title} desc={item.summary} />
                </Box>
              ))}
            </div>
          </Box>
        </Box>
      </Box>
    </Page>
  );
};

export default PostDetailPage;
