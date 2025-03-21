import { EmptyData } from "components/data";
import { FeedbackItem, FeedbackList } from "components/feedback"
import { HeaderSub } from "components/header-sub"
import { FeedbackSkeleton } from "components/skeleton";
import { FEEDBACKDATA } from "constants/utinities";
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next";
import { useInfiniteScroll } from "utils/useInfiniteScroll";
import { Box, Page, useNavigate } from "zmp-ui"

const initParam = {
    pageSize: 5,
};

const FeedbackHistoryPage: React.FC = () => {
    const [param, setParam] = useState(initParam);
    const [listData, setListData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const { t: tCommon } = useTranslation("common");

    const navigate = useNavigate()

    const feedbackWithStatus2 = [];

    const loadMore = () => {
        setParam((prev) => ({
            ...prev,
            pageSize: prev.pageSize + 5,
        }));
    };

    const loaderRef = useInfiniteScroll({
        hasMore: hasMore && listData.length > 0,
        loading,
        onLoadMore: loadMore,
    });

    const fetchFeedback = async () => {
        if (loading && !hasMore) return;

        setLoading(true);

        try {
            const data = feedbackWithStatus2.slice(listData.length, listData.length + param.pageSize);
            
            await new Promise((resolve) => setTimeout(resolve, 1500));

            setListData(prevList => [...prevList, ...data]);

            setHasMore(data.length > 0 && data.length === param.pageSize);

        } catch (error) {
            console.error("Error fetching news:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if(hasMore){
            fetchFeedback();
        }
    }, [param]);

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box px={4}>
                <HeaderSub title={tCommon('feedback-sent')} />
                <Box>
                    {listData.length === 0 && !loading ? (
                        <EmptyData title={tCommon('no-data')} handleClick={() => navigate('/feedback-add')} textBtn={tCommon('send-feedback')} />
                    ) : (
                        <div className="grid grid-cols-1">
                            {listData.map((item, index) => (
                                <FeedbackItem key={index} data={item} />
                            ))}
                        </div>
                    )}
                    <div ref={loaderRef} >
                        {loading && <FeedbackSkeleton count={listData.length === 0 ? 2 : 1} />}
                        {listData.length > 0 && !hasMore && <p className="text-center">{tCommon('all-displayed')}</p>}
                    </div>
                </Box>
            </Box>
        </Page>
    )
}

export default FeedbackHistoryPage