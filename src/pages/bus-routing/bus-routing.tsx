import { BusRoutingItem } from 'components/bus-routing'
import { Divider } from 'components/divider'
import { HeaderSub } from 'components/header-sub'
import FilterBar from 'components/table/FilterBar'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Input, Page, Select } from 'zmp-ui'

export const busData = [
    {
        "name": "Kỳ Son – Thạnh Hóa và Thạnh Hóa Bình Hiệp",
        "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Tr%E1%BA%A1m_xe_bu%C3%BDt_%C4%90H_T%C3%B4n_%C4%90%E1%BB%A9c_Th%E1%BA%AFng.jpg/640px-Tr%E1%BA%A1m_xe_bu%C3%BDt_%C4%90H_T%C3%B4n_%C4%90%E1%BB%A9c_Th%E1%BA%AFng.jpg",
        "time": "5h30 – 19h00"
    },
    {
        "name": "Bến xe Long An – Xã Khánh Hưng",
        "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Tr%E1%BA%A1m_xe_bu%C3%BDt_%C4%90H_T%C3%B4n_%C4%90%E1%BB%A9c_Th%E1%BA%AFng.jpg/640px-Tr%E1%BA%A1m_xe_bu%C3%BDt_%C4%90H_T%C3%B4n_%C4%90%E1%BA%AFng.jpg",
        "time": "5h30 – 16h00"
    },
    {
        "name": "Bến xe Long An – Bến xe Đức Huệ",
        "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Tr%E1%BA%A1m_xe_bu%C3%BDt_%C4%90H_T%C3%B4n_%C4%90%E1%BB%A9c_Th%E1%BA%AFng.jpg/640px-Tr%E1%BA%A1m_xe_bu%C3%BDt_%C4%90H_T%C3%B4n_%C4%90%E1%BB%A9c_Th%E1%BA%AFng.jpg",
        "time": "5h30 – 16h00"
    },
    {
        "name": "Bến xe Tân An – Bến xe Hậu Thanh",
        "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Tr%E1%BA%A1m_xe_bu%C3%BDt_%C4%90H_T%C3%B4n_%C4%90%E1%BB%A9c_Th%E1%BA%AFng.jpg/640px-Tr%E1%BA%A1m_xe_bu%C3%BDt_%C4%90H_T%C3%B4n_%C4%90%E1%BB%A9c_Th%E1%BA%AFng.jpg",
        "time": "5h30 – 16h00"
    },
    {
        "name": "Nhà thương đa khoa Long An – Phú Mỹ",
        "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Tr%E1%BA%A1m_xe_bu%C3%BDt_%C4%90H_T%C3%B4n_%C4%90%E1%BB%A9c_Th%E1%BA%AFng.jpg/640px-Tr%E1%BA%A1m_xe_bu%C3%BDt_%C4%90H_T%C3%B4n_%C4%90%E1%BB%A9c_Th%E1%BA%AFng.jpg",
        "time": "5h30 – 16h00"
    }
]

const BusRoutingPage = () => {

    const { Option } = Select
    const { t: tCommon } = useTranslation("common");

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title={tCommon("bus-route")} />
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
                                placeholder={tCommon("all")}
                                closeOnSelect
                            >
                                <Option title={tCommon("all")} value={0} />
                            </Select>
                        </div>
                    </FilterBar>
                    <Divider />
                    <Box px={4} pt={4}>
                        {
                            busData.map((item, index) => (
                                <Box mb={6} key={index}>
                                    <BusRoutingItem data={item} />
                                </Box>
                            ))
                        }
                    </Box>
                </Box>
            </Box>
        </Page>
    )
}

export default BusRoutingPage