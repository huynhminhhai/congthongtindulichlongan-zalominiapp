import { Divider } from 'components/divider'
import { HeaderSub } from 'components/header-sub'
import { MarketItem } from 'components/market'
import FilterBar from 'components/table/FilterBar'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Input, Page, Select } from 'zmp-ui'

export const marketData = [
    {
        name: "Chợ Bến Lức",
        address: "234 Bùi Thị Đồng, TT. Bến Lức, Bến Lức, Long An",
        img: "https://file4.batdongsan.com.vn/resize/745x510/2023/05/06/20230506154916-509b_wm.jpg"
    },
    {
        name: "Chợ Gò Đen",
        address: "133 Đường Phan Văn Mãng, KP9, Thị trấn Bến Lức, Tỉnh Long An",
        img: "https://global-uploads.webflow.com/60af8c708c6f35480d067652/6228d5526caecd51b260c7b5_screenshot_1646843202.png"
    },
    {
        name: "Chợ Thuận Đạo",
        address: "78 KP 8, TT. Bến Lức, Bến Lức, Long An",
        img: "https://down-vn.img.susercontent.com/vn-11134259-7r98o-lw8enta46cpn83@resize_ss640x400"
    },
    {
        name: "Chợ Nhựt Chánh",
        address: "78 KP 8, TT. Bến Lức, Bến Lức, Long An",
        img: "https://file4.batdongsan.com.vn/resize/745x510/2023/06/06/20230606132703-4050_wm.jpg"
    },
    {
        name: "Chợ Thủ Thừa",
        address: "78 KP 8, TT. Bến Lức, Bến Lức, Long An",
        img: "https://daiachau.vn/wp-content/uploads/2020/11/DJI_0671.jpg"
    }
];


const ShoppingPage = () => {

    const { Option } = Select
    const { t: tCommon } = useTranslation("common");

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title={tCommon("markets")} />
                <Box pb={4}>
                    <FilterBar
                        showAddButton={false}
                    >
                        <div className="col-span-12">
                            <Input
                                placeholder={tCommon("searching")}
                                value={''}
                            />
                        </div>
                        <div className="col-span-12">
                            <Select
                                placeholder="Khu vực"
                                closeOnSelect
                            >
                                <Option title={tCommon("all")} value={0} />
                                <Option title={'Nổi tiếng'} value={1} />
                            </Select>
                        </div>
                    </FilterBar>
                    <Divider />
                    <Box px={4} pt={4}>
                        {
                            marketData.map((item, index) => (
                                <Box mb={6} key={index}>
                                    <MarketItem data={item} />
                                </Box>
                            ))
                        }
                    </Box>
                </Box>
            </Box>
        </Page>
    )
}

export default ShoppingPage