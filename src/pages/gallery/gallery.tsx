import { DestinationItem } from 'components/destination'
import { destinationData } from 'components/destination/DestinationSection'
import { Divider } from 'components/divider'
import { GalleryItem } from 'components/gallery'
import { HeaderSub } from 'components/header-sub'
import FilterBar from 'components/table/FilterBar'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Input, Page, Select, useNavigate } from 'zmp-ui'

export const galleryData = [
    {
        title: 'Thực vật Long An',
        img: 'https://khuyennongvn.gov.vn/portals/0/news_images/2015/10/nguyetkn/dua_hau.jpg',
        alt: 'Thực vật Long An',
        category: 1
    },
    {
        title: 'Hình ảnh giá trị địa chất',
        img: 'https://media.la34.com.vn/upload/image/201509/medium/69258_A1.jpg',
        alt: 'Hình ảnh giá trị địa chất',
        category: 1
    },
    {
        title: 'Thiên Nhiên & Văn Hóa',
        img: 'https://vocongton.wordpress.com/wp-content/uploads/2024/09/long-an-que-huong-toi-02.jpg',
        alt: 'Thiên Nhiên & Văn Hóa',
        category: 1
    },
    {
        title: 'Hành Trình Trải Nghiệm Đáng Nhớ',
        img: 'https://media.vietnamplus.vn/images/7255a701687d11cb8c6bbc58a6c80785987dd491ccd2796e1d44e73ef229421b32fa3d014e2040f13f8c98354406681a2a99523f2fe5e4403176af1a434f7a53/du-lich-long-an-1802.jpg.webp',
        alt: 'Hành Trình Trải Nghiệm Đáng Nhớ',
        category: 2
    }
]

const GalleryPage = () => {

    const { Option } = Select
    const { t: tCommon } = useTranslation("common");

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title={tCommon("gallery")} />
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
                                    placeholder={tCommon("all")}
                                    closeOnSelect
                                >
                                    <Option title={tCommon("all")} value={0} />
                                    <Option title={'Nổi tiếng'} value={1} />
                                </Select>
                            </div>
                        </FilterBar>
                    </Box>
                    <Box px={4}>
                        {
                            galleryData.map((item, index) => (
                                <Box mb={6} key={index}>
                                    <GalleryItem data={item} />
                                </Box>
                            ))
                        }
                    </Box>
                </Box>
            </Box>
        </Page>
    )
}

export default GalleryPage