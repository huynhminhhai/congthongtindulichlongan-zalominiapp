import { Divider } from 'components/divider'
import { HeaderSub } from 'components/header-sub'
import { RestaurantItem } from 'components/restaurant'
import { restaurantData } from 'components/restaurant/RestaurantSection'
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
                <HeaderSub title={tCommon('restaurants')} />
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
                                    placeholder={tCommon('restaurant-type')}
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
                            restaurantData.map((item, index) => (
                                <Box mb={6} key={index}>
                                    <RestaurantItem data={item} />
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