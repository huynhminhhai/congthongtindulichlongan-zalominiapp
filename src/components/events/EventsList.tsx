import React, { useCallback, useEffect, useState } from "react";
import { Box, Input, Select, useNavigate } from "zmp-ui";
import { useInfiniteScroll } from "utils/useInfiniteScroll";
import { NewsSkeleton } from "components/skeleton";
import { EmptyData } from "components/data";
import images from "assets/images";
import { useGetNewsList } from "apiRequest/news";
import { FilterBar } from "components/table";
import { useTranslation } from "react-i18next";
import { debounce } from "lodash";

const NewsList: React.FC = () => {
    const [search, setSearch] = useState("");
    const [param, setParam] = useState({
        page: 1,
        pageSize: 10,
        search: ''
    });
    const navigate = useNavigate()
    const { Option } = Select
    const { t: tCommon } = useTranslation("common");

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useGetNewsList(param);

    const listData = data?.pages.reduce((acc, page) => [...acc, ...page], []) || [];

    const loaderRef = useInfiniteScroll({
        hasMore: hasNextPage,
        loading: isFetchingNextPage,
        onLoadMore: fetchNextPage,
    });

    const debouncedSearch = useCallback(
        debounce((value) => {
            setParam((prev) => ({ ...prev, search: value }));
        }, 300),
        []
    );

    useEffect(() => {
        debouncedSearch(search);
    }, [search, debouncedSearch]);

    return (
        <Box>
            <Box>
                <FilterBar
                    showAddButton={false}
                    searchComponent={
                        <Input.Search
                            placeholder={tCommon("searching")}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    }
                >
                    <div className="col-span-12">
                        <Select
                            placeholder="Văn hóa"
                            closeOnSelect
                        >
                            <Option title={tCommon('all')} value={0} />
                        </Select>
                    </div>
                </FilterBar>
            </Box>
            <Box>
                {isLoading ? (
                    <Box px={4}>
                        <NewsSkeleton count={5} />
                    </Box>
                ) : listData.length === 0 && !isFetchingNextPage ? (
                    <Box px={4}>
                        <EmptyData title={tCommon("no-data")} />
                    </Box>
                ) : (
                    <div className="grid grid-cols-1">
                        {listData[0] && (
                            <Box mb={4}>
                                <div onClick={() => navigate(`/events-detail/?id=${listData[0].id}`)}>
                                    <img
                                        className="slide-img h-[200px] w-full object-cover"
                                        src={listData[0].imageUrl || images.eventThumnail}
                                        alt={listData[0].title}
                                    />
                                    <Box px={4}>
                                        <div className="flex items-center justify-between mt-3 mb-2 pb-2 border-b-[1px] border-[#355933]">
                                            <div className="text-[13px] leading-[1] font-semibold">{listData[0].category || 'Tin tức'}</div>
                                            <div className="text-[12px] leading-[1] font-medium">{listData[0].publishedDate || '12/12/2025'}</div>
                                        </div>
                                        <h3 className="text-[16px] font-semibold whitespace-normal mt-2 line-clamp-2">{listData[0].title}</h3>
                                        <div className="line-clamp-2">{listData[0].body}</div>
                                    </Box>
                                </div>
                            </Box>
                        )}
                        <Box px={4}>
                            {listData.slice(1).map((item) => (
                                <Box
                                    key={item.id}
                                    onClick={() => navigate(`/events-detail/?id=${item.id}`)}
                                    mb={4}
                                >
                                    <div className="flex gap-3">
                                        <img
                                            className="slide-img w-[140px] h-[100px] object-cover"
                                            src={item.imageUrl || images.eventThumnail}
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
                    </div>
                )}
            </Box>
            <div ref={loaderRef} className="px-4">
                {isFetchingNextPage && <NewsSkeleton count={1} />}
                {listData.length > 0 && !hasNextPage && <p className="text-center pt-4">Đã hiển thị tất cả sự kiện</p>}
            </div>
        </Box>
    );
};

export default NewsList;