
import { useGetNewsDetail } from "apiRequest/news"
import images from "assets/images"
import { ActionButton, CommentSection, ShareInfor } from "components/actions"
import { EmptyData } from "components/data"
import { HeaderSub } from "components/header-sub"
import { NewsOthers } from "components/news"
import { NewsDetailSkeleton } from "components/skeleton"
import TitleSection from "components/titleSection"
import React from "react"
import { useSearchParams } from "react-router-dom"
import { Box, Page, useNavigate } from "zmp-ui"

const NewsDetailPage: React.FC = () => {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate()

    const newsId = searchParams.get("id");

    const { data, isLoading } = useGetNewsDetail(Number(newsId));

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title="Chi tiết tin tức" onBackClick={() => navigate('/news')} />
                {
                    isLoading ?
                        <NewsDetailSkeleton count={1} /> :
                        data ?
                            <Box px={4}>
                                <Box pb={4}>
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="h-[24px] w-[5px] bg-[#355933] block"></div>
                                        <h3 className="text-[16px] leading-[1] font-medium">Tin tức</h3>
                                    </div>
                                    <h2 className="text-[22px] leading-[28px] font-semibold mb-2 text-[#355933]">
                                        {data.id} - {data.title}
                                    </h2>
                                    <h4 className="text-[14px] leading-[1] font-medium">12/12/2025</h4>
                                    <div className="flex justify-end gap-3">
                                        <ActionButton
                                            icon="mdi:heart"
                                            altText="Mục yêu thích"
                                            isChecked={true}
                                            onClick={() => console.log('call api favorite')}
                                        />
                                        <ActionButton
                                            icon="mdi:bookmark"
                                            altText="Lưu trữ"
                                            isChecked={false}
                                            onClick={() => console.log('call api bookmarked')}
                                        />
                                    </div>
                                    <Box mt={6}>
                                        <div className="mb-3">
                                            <img src={data.imageUrl || images.thumbnailNews} alt={data.title} />
                                        </div>
                                        <div className="detail-content" dangerouslySetInnerHTML={{ __html: data.body }}></div>
                                    </Box>
                                    <div className="block h-[1px] w-[100%] bg-[#355933] my-4"></div>
                                </Box>
                                <Box mb={4}>
                                    <CommentSection itemId={Number(newsId)} />
                                    <ShareInfor />
                                </Box>
                            </Box>
                            :
                            <Box px={4} pb={10}>
                                <EmptyData
                                    title="Bài viết không tồn tại!"
                                    desc="Không thể tìm thấy bài viết bạn yêu cầu"
                                />
                            </Box>
                }
                <Box pt={4} px={4}>
                    <TitleSection title="Tin tức khác" mB={2} handleClick={() => navigate('/news')} />
                    <NewsOthers idNews={Number(newsId)} />
                </Box>

            </Box>
        </Page>
    )
}

export default NewsDetailPage