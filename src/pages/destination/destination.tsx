import { DestinationItem } from 'components/destination'
import { destinationData } from 'components/destination/DestinationSection'
import { Divider } from 'components/divider'
import { HeaderSub } from 'components/header-sub'
import FilterBar from 'components/table/FilterBar'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Input, Page, Select } from 'zmp-ui'

const DestinationPage = () => {

    const { Option } = Select
    const { t: tCommon } = useTranslation("common");

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title={tCommon('destinations')} />
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
                                    <Option title={'Xung quanh'} value={1} />
                                </Select>
                            </div>
                            <div className="col-span-6">
                                <Select
                                    placeholder={tCommon('cost')}
                                    closeOnSelect
                                >
                                    <Option title={tCommon('all')} value={0} />
                                    <Option title={'Xung quanh'} value={1} />
                                </Select>
                            </div>
                            <div className="col-span-6">
                                <Select
                                    placeholder={tCommon('location-type')}
                                    closeOnSelect
                                >
                                    <Option title={tCommon('all')} value={0} />
                                    <Option title={'Xung quanh'} value={1} />
                                </Select>
                            </div>
                        </FilterBar>
                    </Box>
                    <Box px={4}>
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