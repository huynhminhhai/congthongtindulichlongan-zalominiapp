import { DestinationItem } from 'components/destination'
import { destinationData } from 'components/destination/DestinationSection'
import { Divider } from 'components/divider'
import { HeaderSub } from 'components/header-sub'
import FilterBar from 'components/table/FilterBar'
import React from 'react'
import { Box, Input, Page, Select, useNavigate } from 'zmp-ui'

const DestinationPage = () => {

    const { Option } = Select

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title="Địa điểm nổi bật" />
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
                                <Option title={'Xung quanh'} value={1} />
                            </Select>
                        </div>
                        <div className="col-span-6">
                            <Select
                                placeholder="Chi phí"
                                closeOnSelect
                            >
                                <Option title={'Tất cả'} value={0} />
                                <Option title={'Xung quanh'} value={1} />
                            </Select>
                        </div>
                        <div className="col-span-6">
                            <Select
                                placeholder="Loại địa điểm"
                                closeOnSelect
                            >
                                <Option title={'Tất cả'} value={0} />
                                <Option title={'Xung quanh'} value={1} />
                            </Select>
                        </div>
                    </FilterBar>
                    <Divider />
                    <Box px={4} pt={4}>
                        {
                            destinationData.map((item, index) => (
                                <Box mb={3} key={index}>
                                    <DestinationItem data={item} />
                                </Box>
                            ))
                        }
                    </Box>
                </Box>
            </Box>
        </Page>
    )
}

export default DestinationPage