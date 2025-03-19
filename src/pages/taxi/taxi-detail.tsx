import { Icon } from '@iconify/react'
import images from 'assets/images'
import { ActionButton } from 'components/actions'
import { HeaderSub } from 'components/header-sub'
import { ImageGallery } from 'components/slider'
import TitleSection from 'components/titleSection'
import React from 'react'
import { Box, Page, useNavigate } from 'zmp-ui'
import { ItemDetailCard, TitleDetail, TitleSubDetail } from 'components/detail'
import { taxiData } from './taxi'

const location = {
    lat: 10.554719681776884,
    lng: 106.4204412631839,
    name: "MAI LINH LONG AN",
    address: " Số 29B Nguyễn Văn Tiếp, Phường 5, thành phố Tân An, tỉnh Long An",
    img: "https://top10longan.com/wp-content/uploads/2023/10/350279622_245444961427697_5743052734367032241_n.jpg",
    markerImg: images.markerTaxi,
};


const ShoppingDetailPage = () => {

    const navigate = useNavigate()

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title="Chi tiết taxi" />
                <Box p={4}>
                    <Box>
                        <Box mb={3} flex alignItems='flex-end' justifyContent='space-between'>
                            <TitleDetail title={location.name} />
                            <ActionButton
                                icon="mdi:heart"
                                altText="Mục yêu thích"
                                isChecked={true}
                                onClick={() => console.log('call api favorite')}
                            />
                        </Box>
                        {/* <Box mb={9}>
                            <ImageGallery images={imagesGallery} />
                        </Box> */}
                        <Box mb={9}>
                            <TitleSubDetail title='Thông tin' />
                            <Box>
                                <ul className='flex flex-col gap-3 font-medium'>
                                    <li className='flex items-start gap-3'>
                                        <Icon fontSize={24} icon='fluent:location-28-regular' />
                                        <div className='flex-1'>{location.address}</div>
                                    </li>
                                    {/* <li className='flex items-start gap-3'>
                                        <Icon fontSize={24} icon='material-symbols-light:mail-outline' />
                                        <div className='flex-1'>sanhafood.longan@gmail.com</div>
                                    </li> */}
                                    <li className='flex items-start gap-3'>
                                        <Icon fontSize={24} icon='mdi-light:phone' />
                                        <div className='flex-1'>0397455789</div>
                                    </li>
                                </ul>
                            </Box>
                        </Box>
                        <Box mb={9}>
                            <TitleSubDetail title='Mô tả' />
                            <div className="detail-content" dangerouslySetInnerHTML={{
                                __html: `
                                    <p><strong>Giới thiệu về taxi mai linh</strong></p>
                                    <p>Taxi Mai Linh là một trong những dịch vụ vận tải của tập đoàn Mai Linh. Tiền thân là công ty tnhh vận tải hành khách và du lịch mai linh. Công ty được thành lập vào 12/7/1993 tại Hồ Chí Minh.

                                        Hiện nay, công ty taxi mai linh đã và đang là dịch vụ nổi tiếng nhất ở Việt Nam và đã có mặt trên hầu hết các tỉnh thành trên cả nước.</p>
                                    <p>
                                        <b>Ý nghĩa của thương hiệu Mai Linh</b>
                                    </p>   
                                    <p>
                                        </p><ol>
                                            <li>Mai” nó nói lên hình ảnh của bông hoa mai trong ngày tết cổ truyền của dân tộc việt nam. Mang tới cho chúng ta sự may mắn và hạnh phúc.</li>
                                            <li>“Linh” mang ý nghĩa của sự linh động. linh hoạt, tinh nhanh trong giải quyết công việc và đi lại.</li>
                                        </ol>
                                    <p></p>
                                `}}>
                            </div>
                        </Box>
                        {/* <Box mb={9}>
                            <TitleSubDetail title='Bản đồ' />
                            <div className="infor-map">
                                <SingleLocationMap location={location} />
                            </div>
                        </Box> */}
                    </Box>
                </Box>
                <Box px={4} pb={4}>
                    <TitleSection title="Taxi khác" mB={2} handleClick={() => navigate('/taxi')} />
                    <Box pt={4}>
                        <div className="grid grid-cols-1 gap-3">
                            {
                                taxiData.map((item, index) => (
                                    <Box key={index} onClick={() => navigate('/taxi-detail')}>
                                        <ItemDetailCard imgUrl={item.img} title={item.name} desc={item.address} />
                                    </Box>
                                ))
                            }
                        </div>
                    </Box>
                </Box>
            </Box>
        </Page>
    )
}

export default ShoppingDetailPage