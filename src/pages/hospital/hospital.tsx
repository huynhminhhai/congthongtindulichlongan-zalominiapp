import { Divider } from 'components/divider'
import { HeaderSub } from 'components/header-sub'
import { HospitalItem } from 'components/hospital'
import FilterBar from 'components/table/FilterBar'
import React from 'react'
import { Box, Input, Page, Select } from 'zmp-ui'

export const medicalData = [
    {
        "name": "Bệnh viện Đa khoa tỉnh",
        "address": "Số 211, Nguyễn Thông, Phường 3, Thành phố Tân An, tỉnh Long An",
        "img": "https://images2.thanhnien.vn/zoom/686_429/Uploaded/trangtt/2021_07_17/la_NDJQ.jpg"
    },
    {
        "name": "Trung tâm Y tế huyện Bến Lức",
        "address": "Số 126, Nguyễn Hữu Thọ, Khu phố 3, TT Bến Lức, huyện Bến Lức, tỉnh Long An",
        "img": "https://ttytbenluc.com.vn/wp-content/uploads/2024/04/11-715x400.png"
    },
    {
        "name": "Trạm Y tế xã Thạnh Lợi",
        "address": "Ấp 5, xã Thạnh Lợi, huyện Bến Lức, tỉnh Long An",
        "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy584buK1OguddfONg8r4F1oHVjfy4ZVOSuQ&amp;s"
    },
    {
        "name": "Trạm Y tế xã Mỹ Yên",
        "address": "Ấp 4, xã Mỹ Yên, huyện Bến Lức, tỉnh Long An",
        "img": "https://file4.batdongsan.com.vn/resize/745x510/2024/06/28/20240628091218-d868_wm.jpg"
    },
    {
        "name": "Trạm Y tế xã Tân Bửu",
        "address": "Thị trấn Hậu Nghĩa, Đức Hòa, Long An",
        "img": "https://media-cdn-v2.laodong.vn/storage/newsportal/2024/12/18/1437152/TYT-14.jpg"
    },
    {
        "name": "Trạm Y tế xã Tân Hòa",
        "address": "Ấp 1, xã Tân Hòa, huyện Bến Lức, tỉnh Long An",
        "img": "https://media.la34.com.vn/upload/image/202208/medium/1268397_ngay_3_8_2022_ben_luc_tan_hoa_tren_duong_xay_dung_ntm_5_09534803.jpg"
    }
]

const ShoppingPage = () => {

    const { Option } = Select

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title="Cơ sở y tế" />
                <Box pb={4}>
                    <FilterBar
                        showAddButton={false}
                    >
                        <div className="col-span-12">
                            <Input
                                placeholder="Tìm kiếm..."
                                value={''}
                            />
                        </div>
                        <div className="col-span-12">
                            <Select
                                placeholder="Tất cả"
                                closeOnSelect
                            >
                                <Option title={'Tất cả'} value={0} />
                                <Option title={'Nổi tiếng'} value={1} />
                            </Select>
                        </div>
                    </FilterBar>
                    <Divider />
                    <Box px={4} pt={4}>
                        {
                            medicalData.map((item, index) => (
                                <Box mb={6} key={index}>
                                    <HospitalItem data={item} />
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