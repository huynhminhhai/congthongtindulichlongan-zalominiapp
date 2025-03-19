import { HeaderSub } from "components/header-sub"
import React from "react"
import { Box, Input, Page, Select, } from "zmp-ui"

const { Option } = Select;

const SearchPage: React.FC = () => {

    return (
        <Page className="relative flex-1 flex flex-col bg-white pb-[66px]" style={{ backgroundColor: '#f5f6f7' }}>
            <Box>
                <HeaderSub title="Tìm kiếm nhanh" />
                <Box p={4}>
                    <Box mb={2}>
                        <Select
                            placeholder="Tất cả"
                            defaultValue={[]}
                            className="h-[46px]"
                        >
                            <Option value="1" title="Option 1" />
                            <Option value="2" title="Option 2" />
                            <Option value="3" title="Option 3" />
                        </Select>
                    </Box>
                    <Input.Search
                        className="h-[46px]"
                        focused
                        placeholder="Tìm nhanh địa điểm, đặc sản..."
                        onSearch={(text) => console.log(text)}
                    />
                    <div className="text-[16px] leading-[1] font-semibold my-3">Kết quả (2)</div>
                    <Box flex flexDirection="column" className="gap-3">
                        <div className="flex items-center gap-3">
                            <img className="w-[100px] h-[70px] object-cover rounded-lg" src="https://ik.imagekit.io/tvlk/blog/2023/11/nha-tram-cot-cover.jpg" alt="địa điểm" />
                            <div>
                                <span className="text-[16px] leading-[24px] font-semibold line-clamp-2">Nhà trăm cột</span>
                                <span className="text-[12px] leading-[20px] font-medium line-clamp-1">
                                    Địa điểm nổi bật
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <img className="w-[100px] h-[70px] object-cover rounded-lg" src="https://www.thatlangon.com/wp-content/uploads/2021/09/canh-chua-ca-tln1-e1633942511539.jpg" alt="địa điểm" />
                            <div>
                                <span className="text-[16px] leading-[24px] font-semibold line-clamp-2">Canh chua cá chốt</span>
                                <span className="text-[12px] leading-[20px] font-medium line-clamp-1">
                                    Đặc sản
                                </span>
                            </div>
                        </div>
                    </Box>
                </Box>
            </Box>
        </Page>
    )
}

export default SearchPage