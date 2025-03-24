import { Icon } from '@iconify/react'
import images from 'assets/images'
import { ActionButton, CommentSection, Rating, ShareInfor } from 'components/actions'
import { HeaderSub } from 'components/header-sub'
import { SingleLocationMap } from 'components/maps'
import { ImageGallery } from 'components/slider'
import TitleSection from 'components/titleSection'
import React from 'react'
import { Box, Page, useNavigate } from 'zmp-ui'
import { ItemDetailCard, TitleDetail, TitleSubDetail } from 'components/detail'
import { shoppingData } from './shopping'
import { useTranslation } from 'react-i18next'

export const imagesGallery = [
    'https://www.baolongan.vn/image/news/2020/20201222/images/df59710e29aed8f081bf.jpg',
    'https://www.tvu.edu.vn/wp-content/uploads/2022/06/san-ha-9.jpg',
    'https://csdl.vietnamtourism.gov.vn/uploads/images/01_3/CSDLDIEMMUASAM2020/LongAn/CHSanHaFood/MG-6690-JPG-9805-1578995835.jpg',
]

const location = {
    lat: 10.642918619273143,
    lng: 106.48998109506897,
    name: "San Hà Food Store",
    address: "Số 151, Nguyễn Văn Siêu, Xã Thanh Phú, Huyện Bến Lức, Tỉnh Long An.",
    img: "https://www.baolongan.vn/image/news/2020/20201222/images/df59710e29aed8f081bf.jpg",
    markerImg: images.markerShopping,
};

const ShoppingDetailPage = () => {

    const navigate = useNavigate()
    const { t: tPage } = useTranslation("page");

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title={tPage('shoppings-detail')} />
                <Box>
                    <Box mb={2}>
                        <ImageGallery images={imagesGallery} />
                    </Box>
                    <Box p={4}>
                        <Box mb={3} flex alignItems='flex-end' justifyContent='space-between' className='gap-2'>
                            <TitleDetail title={location.name} />
                            <ActionButton
                                icon="mdi:heart"
                                altText="Mục yêu thích"
                                isChecked={true}
                                onClick={() => console.log('call api favorite')}
                            />
                        </Box>

                        <Box mb={9}>
                            <Box>
                                <ul className='flex flex-col gap-3 font-medium'>
                                    <li className='flex items-start gap-2'>
                                        <Icon fontSize={24} icon='fluent:location-28-regular' />
                                        <div className='flex-1'>{location.address}</div>
                                    </li>
                                    <li className='flex items-start gap-2'>
                                        <Icon fontSize={24} icon='material-symbols-light:mail-outline' />
                                        <div className='flex-1'>sanhafood.longan@gmail.com</div>
                                    </li>
                                    <li className='flex items-start gap-2'>
                                        <Icon fontSize={24} icon='mdi-light:phone' />
                                        <div className='flex-1'>0397455789</div>
                                    </li>
                                </ul>
                            </Box>
                        </Box>
                        <Box mb={9}>
                            <TitleSubDetail title={tPage('desc')} />
                            <div className="detail-content" dangerouslySetInnerHTML={{
                                __html: `
                                    <p>
                                        §San Hà được người tiêu dùng biết đến với nhãn hiệu quen thuộc ‘’Ngọc Hà’’. Thương hiệu đã có mặt trên thị trường hơn 27 năm qua.
                                    </p>
                                        <p>
                                        §San Hà được người tiêu dùng biết đến với nhãn hiệu quen thuộc ‘’Ngọc Hà’’. Thương hiệu đã có mặt trên thị trường hơn 27 năm qua.
                                    </p>
                                        <p>
                                        §Đội ngũ hơn 800 CB-NV, với 04 nhà máy sản xuất, cung ứng thị trường hơn 100 
                                    </p>
                                `}}>
                            </div>
                        </Box>
                        <Box mb={9}>
                            <TitleSubDetail title={tPage('map')} />
                            <div className="infor-map">
                                <SingleLocationMap location={location} />
                            </div>
                        </Box>
                    </Box>
                </Box>
                <Box px={4} mb={10}>
                    <CommentSection itemId={1} />
                    <ShareInfor />
                    <Rating
                        averageRating={4.2}
                        totalReviews={100}
                        ratingDistribution={{ 5: 50, 4: 30, 3: 10, 2: 5, 1: 5 }}
                        onRate={(rating) => console.log("Người dùng chọn:", rating)}
                    />
                </Box>
                <Box px={4} pb={4}>
                    <TitleSection title={tPage('shoppings-others')} mB={2} handleClick={() => navigate('/shopping')} />
                    <Box pt={4}>
                        <div className="grid grid-cols-1 gap-3">
                            {
                                shoppingData.map((item, index) => (
                                    <Box key={index} onClick={() => navigate('/shopping-detail')}>
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