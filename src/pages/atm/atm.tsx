import { AtmItem } from 'components/atm'
import { Divider } from 'components/divider'
import { HeaderSub } from 'components/header-sub'
import FilterBar from 'components/table/FilterBar'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Input, Page, Select } from 'zmp-ui'

export const atmData = [
    {
        name: "Agribank Atm",
        address: "Phường 6, Tp. Tân An, Long An, Việt Nam",
        img: "https://bizweb.dktcdn.net/100/446/826/files/logo-ngan-hang-agribank-1.jpg?v=1656987426142"
    },
    {
        name: "Agribank Atm",
        address: "Phường 2, Tân An, Long An, Việt Nam",
        img: "https://bizweb.dktcdn.net/100/446/826/files/logo-ngan-hang-agribank-1.jpg?v=1656987426142"
    },
    {
        name: "ATM - XDigi KienlongBank Tân An",
        address: "46 - 48 Hùng Vương nối dài, Tân An, Long An 821110, Việt Nam",
        img: "https://kienlongbank.com/Data/Sites/1/media/Tin-Kien-Long/2021/thong-bao-thay-doi-logo-nhan-dien-thuong-hieu-moi/kienlongbank-logo.png"
    }
];


const AtmPage = () => {

    const { Option } = Select
    const { t: tCommon } = useTranslation("common");

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title={tCommon("atm")} />
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
                                    placeholder="Khu vực"
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
                            atmData.map((item, index) => (
                                <Box mb={6} key={index}>
                                    <AtmItem data={item} />
                                </Box>
                            ))
                        }
                    </Box>
                </Box>
            </Box>
        </Page>
    )
}

export default AtmPage