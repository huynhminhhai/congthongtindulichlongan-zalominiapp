import { CusineItem } from 'components/cusine'
import { cusineData } from 'components/cusine/CusineSection'
import { Divider } from 'components/divider'
import { HeaderSub } from 'components/header-sub'
import FilterBar from 'components/table/FilterBar'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Input, Page, Select } from 'zmp-ui'

const CusinePage = () => {

    const { Option } = Select
    const { t: tCommon } = useTranslation("common");

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title={tCommon('cusine')} />
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
                            cusineData.map((item, index) => (
                                <Box mb={6} key={index}>
                                    <CusineItem data={item} />
                                </Box>
                            ))
                        }
                    </Box>
                </Box>
            </Box>
        </Page>
    )
}

export default CusinePage