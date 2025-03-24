import { Divider } from 'components/divider'
import { HeaderSub } from 'components/header-sub'
import { OilItem } from 'components/oil'
import FilterBar from 'components/table/FilterBar'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Input, Page, Select } from 'zmp-ui'

export const oilData = [
    {
        "name": "CÔNG TY TNHH MTV NGỌC MAI",
        "address": "363, Ấp Vĩnh Hòa, Xã An Vĩnh Ngãi, Thành phố Tân An, Tỉnh Long An, Việt Nam",
        "img": "https://opgplus.com/wp-content/uploads/2023/08/gas-station.jpeg"
    },
    {
        "name": "CÔNG TY TNHH TRUNG DŨNG LONG AN",
        "address": "108 Tuyến tránh Quốc Lộ 1, Phường 4, Thành phố Tân An, Tỉnh Long An, Việt Nam",
        "img": "https://opgplus.com/wp-content/uploads/2023/08/gas-station.jpeg"
    },
    {
        "name": "CÔNG TY TNHH TRUNG DŨNG LONG AN",
        "address": "108 Tuyến tránh Quốc Lộ 1, Phường 4, Thành phố Tân An, Tỉnh Long An, Việt Nam",
        "img": "https://opgplus.com/wp-content/uploads/2023/08/gas-station.jpeg"
    },
    {
        "name": "CÔNG TY TNHH VẬT TƯ XĂNG DẦU LÊ TRUNG",
        "address": "Số 579, Ngã 3 Mỹ Hạnh, Ấp Mới 2, Xã Mỹ Hạnh Nam, Huyện Đức Hoà, Tỉnh Long An, Việt Nam",
        "img": "https://opgplus.com/wp-content/uploads/2023/08/gas-station.jpeg"
    },
    {
        "name": "CÔNG TY TNHH VẬT TƯ XĂNG DẦU LÊ TRUNG",
        "address": "Số 579, Ngã 3 Mỹ Hạnh, Ấp Mới 2, Xã Mỹ Hạnh Nam, Huyện Đức Hoà, Tỉnh Long An, Việt Nam",
        "img": "https://opgplus.com/wp-content/uploads/2023/08/gas-station.jpeg"
    },
    {
        "name": "PETROLIMEX - CỬA HÀNG 02",
        "address": "Đường Trương Định, phường 2, thành phố Tân An, tỉnh Long An",
        "img": "https://opgplus.com/wp-content/uploads/2023/08/gas-station.jpeg"
    }
]

const ShoppingPage = () => {

    const { Option } = Select
    const { t: tCommon } = useTranslation("common");

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title={tCommon('fuel')} />
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
                            <div className="col-span-12">
                                <Select
                                    placeholder={tCommon('all')}
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
                            oilData.map((item, index) => (
                                <Box mb={6} key={index}>
                                    <OilItem data={item} />
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