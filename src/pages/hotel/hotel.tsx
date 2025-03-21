import { Divider } from 'components/divider'
import { HeaderSub } from 'components/header-sub'
import { HotelItem } from 'components/hotel'
import { hotelData } from 'components/hotel/HotelSection'
import FilterBar from 'components/table/FilterBar'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Input, Page, Select } from 'zmp-ui'

const HotelPage = () => {

    const { Option } = Select
    const { t: tCommon } = useTranslation("common");

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title={tCommon('accommodations')} />
                <Box pb={4}>
                    <FilterBar
                        showAddButton={false}
                    >
                        <div className="col-span-12">
                            <Input
                                placeholder={tCommon('searching')}
                                value={''}
                            />
                        </div>
                        <div className="col-span-12">
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
                                placeholder={tCommon('cost')}
                                closeOnSelect
                            >
                                <Option title={tCommon('all')} value={0} />
                                <Option title={'Nổi tiếng'} value={1} />
                            </Select>
                        </div>
                        <div className="col-span-6">
                            <Select
                                placeholder={tCommon('accommodation-type')}
                                closeOnSelect
                            >
                                <Option title={tCommon('all')} value={0} />
                                <Option title={'Nổi tiếng'} value={1} />
                            </Select>
                        </div>
                    </FilterBar>
                    <Divider />
                    <Box px={4} pt={4}>
                        {
                            hotelData.map((item, index) => (
                                <Box mb={6} key={index}>
                                    <HotelItem data={item} />
                                </Box>
                            ))
                        }
                    </Box>
                </Box>
            </Box>
        </Page>
    )
}

export default HotelPage