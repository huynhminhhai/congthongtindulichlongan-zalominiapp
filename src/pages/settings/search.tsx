import { ItemDetailCard } from "components/detail";
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
                        <ItemDetailCard title="Nhà trăm cột" imgUrl="https://ik.imagekit.io/tvlk/blog/2023/11/nha-tram-cot-cover.jpg" desc="Địa điểm nổi bật" />
                        <ItemDetailCard title="Tuần Văn hóa - Thể thao - Du lịch tỉnh Long An lần thứ 2 năm 2024 - Thành công tốt đẹp" imgUrl="https://www.baolongan.vn/image/news/2024/20241205/images/khai%20m%E1%BA%A1c%20(38).jpg" desc="Sự kiện" />
                    </Box>
                </Box>
            </Box>
        </Page>
    )
}

export default SearchPage