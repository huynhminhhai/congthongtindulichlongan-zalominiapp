import { Divider } from 'components/divider'
import { HeaderSub } from 'components/header-sub'
import { ShoppingItem } from 'components/shopping'
import FilterBar from 'components/table/FilterBar'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Input, Page, Select } from 'zmp-ui'

export const shoppingData = [
    {
        name: "Hộ Kinh Doanh Cơ Sở Sản Xuất Lạp Xưởng Cô Châu",
        address: "Số 63B, khu 1B, Thị trấn Cần Đước, huyện Cần Đước, tỉnh Long An",
        img: "https://scontent.iocvnpt.com/resources/portal//Images/LAN/lapxuongtuoicochau/thumb/lap_xuong_82342787.jpg"
    },
    {
        name: "CO.OOP MART TÂN AN",
        address: "01 Mai Thị Tốt, Phường 2, Tân An, Long An",
        img: "https://scontent.iocvnpt.com/resources/portal//Images/LAN/trietnm.lan/Tan%20An/Co.oopmart/thumb/20160724_160821_637017986773565994.jpg"
    },
    {
        name: "San Hà Food Store",
        address: "Bến Xe Tân Trụ cũ, Nguyễn Trung Trực, tt. Tân Trụ, Tân Trụ, Long An, Việt Nam",
        img: "https://scontent.iocvnpt.com/resources/portal//Images/LAN/congtysanha/thumb/tt1_180282592.jpg"
    },
    {
        name: "Vincom Plaza Tân An",
        address: "Góc đường Hùng Vương và đường Mai Thị Tốt, Phường 2, Tp. Tân An, Long An",
        img: "https://scontent.iocvnpt.com/resources/portal//Images/LAN/trietnm.lan/Tan%20An/vincom/thumb/avatar123_637025777707993363.jpg"
    },
    {
        name: "CÔNG TY CP THỰC PHẨM HG",
        address: "Xã Mỹ Phú, Huyện Thủ Thừa, Tỉnh Long An",
        img: "https://scontent.iocvnpt.com/resources/portal//Images/LAN/sangvt.lan/doanh_nghiep/vu_hang/thumb/1_465904093.jpg"
    },
    {
        name: "San Hà Food Store",
        address: "Số 151, Nguyễn Văn Siêu, Xã Thanh Phú, Huyện Bến Lức, Tỉnh Long An",
        img: "https://scontent.iocvnpt.com/resources/portal//Images/LAN/congtysanha/thumb/dsc00157_538897282.jpg"
    }
]

const ShoppingPage = () => {

    const { Option } = Select
    const { t: tCommon } = useTranslation("common");

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title={tCommon('shoppings')} />
                <Box pb={4}>
                    <Box>
                        <FilterBar
                            showAddButton={false}
                            searchComponent={
                                <Input.Search
                                    placeholder={tCommon('searching')}
                                    value={''}
                                />
                            }
                        >
                            <div className="col-span-6">
                                <Select
                                    placeholder={tCommon('all')}
                                    closeOnSelect
                                >
                                    <Option title={tCommon('all')} value={0} />
                                    <Option title={'Nổi tiếng'} value={1} />
                                </Select>
                            </div>
                            <div className="col-span-6">
                                <Select
                                    placeholder="Loại mua sắm"
                                    closeOnSelect
                                >
                                    <Option title={tCommon('all')} value={0} />
                                    <Option title={'Nổi tiếng'} value={1} />
                                </Select>
                            </div>
                        </FilterBar>
                    </Box>
                    <Box px={4}>
                        {
                            shoppingData.map((item, index) => (
                                <Box mb={6} key={index}>
                                    <ShoppingItem data={item} />
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