import { Divider } from 'components/divider'
import { HeaderSub } from 'components/header-sub'
import FilterBar from 'components/table/FilterBar'
import { TourItem } from 'components/tour'
import { tourData } from 'components/tour/TourSection'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Input, Page, Select } from 'zmp-ui'

const TourPage = () => {

    const { Option } = Select
    const { t: tCommon } = useTranslation("common");

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title={tCommon('tours')} />
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
                                    placeholder="Liên tỉnh"
                                    closeOnSelect
                                >
                                    <Option title={'Tất cả'} value={0} />
                                    <Option title={'Nổi tiếng'} value={1} />
                                </Select>
                            </div>
                            <div className="col-span-6">
                                <Select
                                    placeholder="Số ngày"
                                    closeOnSelect
                                >
                                    <Option title={'Tất cả'} value={0} />
                                    <Option title={'Nổi tiếng'} value={1} />
                                </Select>
                            </div>
                            <div className="col-span-6">
                                <Select
                                    placeholder="Số người"
                                    closeOnSelect
                                >
                                    <Option title={'Tất cả'} value={0} />
                                    <Option title={'Nổi tiếng'} value={1} />
                                </Select>
                            </div>
                        </FilterBar>
                    </Box>
                    <Box px={4}>
                        {
                            tourData.map((item, index) => (
                                <Box mb={6} key={index}>
                                    <TourItem data={item} />
                                </Box>
                            ))
                        }
                    </Box>
                </Box>
            </Box>
        </Page>
    )
}

export default TourPage