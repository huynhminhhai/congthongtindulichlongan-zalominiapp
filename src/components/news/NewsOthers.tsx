import { NEWSDATA } from "constants/utinities"
import React, { useState } from "react"
import { Box, useNavigate } from "zmp-ui"
import NewsItem from "./NewsItem"
import { useGetNewsList } from "apiRequest/news"
import { EmptyData } from "components/data"
import images from "assets/images"
import { NewsSkeleton } from "components/skeleton"

type NewsOthersProps = {
    idNews: number
}

const initParam = {
    page: 1,
    pageSize: 5,
};

const NewsOthers: React.FC<NewsOthersProps> = ({ idNews }) => {

    const [param, setParam] = useState(initParam);
    const navigate = useNavigate()

    const { data, isLoading } = useGetNewsList(param);

    const listData = data?.pages.reduce((acc, page) => [...acc, ...page], []) || []

    const othersNews = listData.filter(item => item.id !== idNews);

    if (isLoading) {
        return <NewsSkeleton count={5} />
    }

    return (
        <Box pt={3}>
            <div className="grid grid-cols-1">
                {(othersNews.length === 0 && !isLoading) ? (
                    <EmptyData title="Hiện chưa có tin tức nào!" desc="Khi có tin tức, bạn có thể thao tác ngay tại đây. Vui lòng quay lại sau!" />
                ) : (
                    <Box>
                        {othersNews.map((item, index) => (
                            // <NewsItem key={index} data={item} />
                            <Box key={index}
                                onClick={() => navigate(`/news-detail/?id=${item.id}`)}
                                mb={4}
                            >
                                <div onClick={() => navigate(`/news-detail`)} className="flex gap-3">
                                    <img
                                        className="slide-img w-[140px] h-[100px] object-cover"
                                        src={item.imageUrl || images.thumbnailNews}
                                        alt={item.title}
                                    />
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1 pb-2 border-b-[1px] border-[#355933]">
                                            <div className="text-[13px] leading-[1] font-semibold">{item.category || 'Tin tức'}</div>
                                            <div className="text-[12px] leading-[1] font-medium">{item.publishedDate || '12/12/2025'}</div>
                                        </div>
                                        <h3 className="text-[15px] leading-[20px] font-semibold whitespace-normal mt-1 line-clamp-2">{item.id} - {item.title}</h3>
                                        <div className="text-[12px] leading-[16px] line-clamp-2 mt-1">{item.body}</div>
                                    </div>
                                </div>
                            </Box>
                        ))}
                    </Box>
                )}
            </div>
        </Box>
    )
}

export default NewsOthers