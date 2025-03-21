import { Divider } from 'components/divider'
import { HeaderSub } from 'components/header-sub'
import FilterBar from 'components/table/FilterBar'
import { TaxiItem } from 'components/taxi'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Input, Page, Select } from 'zmp-ui'

export const taxiData = [
    {
        "name": "CÔNG TY TNHH DỊCH VỤ VẬN TẢI SAO ĐỎ - CN LONG AN",
        "address": "Số 05, Trương Thị Sáu, Phường 3, TP. Tân An, Long An",
        "img": "https://vieclamcantho.com.vn/public/upload/nhatuyendung/cty-tnhh-dich-vu-van-tai-sao-do---an-giang-taxi-sao-do1582333022.png"
    },
    {
        "name": "CN CÔNG TY CP TĐ MAI LINH TẠI LONG AN",
        "address": "Số 650, Quốc lộ 1A, Phường 4, Thành phố Tân An, tỉnh Long An",
        "img": "https://dautucophieu.net/wp-content/uploads/2017/03/c%E1%BB%95-phi%E1%BA%BFu-Mai-Linh..jpg"
    },
    {
        "name": "C.TY CP TẬP ĐOÀN VẬN TẢI SÀI GÒN - CN LONG AN",
        "address": "Số 650, Quốc lộ 1A, Phường 4, Thành phố Tân An, tỉnh Long An",
        "img": "https://saigontaxi.vn/wp-content/uploads/2020/09/3bc872cd85067a582317-removebg-preview.png"
    },
    {
        "name": "CÔNG TY TNHH OPEN99 LONG AN",
        "address": "Số 33, Phạm Văn Chiêu, Phường 6, TP. Tân An, Long An",
        "img": "https://play-lh.googleusercontent.com/doLMDrq4T1qxg8Hzj0YnXVCA0sIM2LNtU769nUMIzrk8VLu0zq5bALdjscANqTKR0A=w240-h480-rw"
    },
    {
        "name": "CN HỢP TÁC XÃ HÒA BÌNH XANH TẠI LONG AN",
        "address": "29B Nguyễn Văn Tiếp, Phường 5, thành phố Tân An, tỉnh Long An",
        "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTvwhTLGTyjIa4XmAjs5Mq1RItMte7o3tGwG9VocOkRt6s-ftz4txz_GVVAz-jZoSO-sc&usqp=CAU"
    }
]

const TaxiPage = () => {

    const { Option } = Select
    const { t: tCommon } = useTranslation("common");

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title={tCommon("taxi")} />
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
                                <Option title={'Nổi tiếng'} value={1} />
                            </Select>
                        </div>
                    </FilterBar>
                    <Divider />
                    <Box px={4} pt={4}>
                        {
                            taxiData.map((item, index) => (
                                <Box mb={6} key={index}>
                                    <TaxiItem data={item} />
                                </Box>
                            ))
                        }
                    </Box>
                </Box>
            </Box>
        </Page>
    )
}

export default TaxiPage