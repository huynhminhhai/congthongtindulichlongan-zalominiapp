import { Icon } from '@iconify/react'
import images from 'assets/images'
import { ActionButton } from 'components/actions'
import { HeaderSub } from 'components/header-sub'
import { SingleLocationMap } from 'components/maps'
import { ImageGallery } from 'components/slider'
import TitleSection from 'components/titleSection'
import React from 'react'
import { Box, Page, useNavigate } from 'zmp-ui'
import { ItemDetailCard, TitleDetail, TitleSubDetail } from 'components/detail'
import { oilData } from './oil'
import { useTranslation } from 'react-i18next'

const location = {
    lat: 10.538361659296966,
    lng: 106.40700750828708,
    name: "PETROLIMEX - CỬA HÀNG 02",
    address: "  Đường Trương Định, phường 2, thành phố Tân An, tỉnh Long An",
    img: "https://files.petrolimex.com.vn/Files/3BC9B73CA77642449D865CC60EE27021/image=jpeg/dbf4d0461c3f40c7808a218f66c808af/3.JPG",
    markerImg: images.markerOil,
};


const OilDetailPage = () => {

    const navigate = useNavigate()
    const { t: tPage } = useTranslation("page");

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title={tPage('fuel-detail')} />
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
                            <TitleSubDetail title={tPage('infor')} />
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
                            <TitleSubDetail title={tPage('desc')} />
                            <div className="detail-content" dangerouslySetInnerHTML={{
                                    __html: `
                                <p>
                                    <img src="https://files.petrolimex.com.vn/thumbnailwebps/7232EB2ADC1840088D1CDE008392A9B7/1/0/0/e098cb24a1b14da2a1f7a6a9f0287263/PETROLIMEX.JPG.webp" alt="">
                                </p>
                                <p>
                                    Tiền thân của Công ty Xăng dầu Long An (Petrolimex Long An/Công ty) là Công ty Vật tư Tổng hợp Long An - Kiến Tường thuộc hệ thống của ngành Vật tư chịu sự lãnh đạo và chỉ đạo hai chiều của Tổng Cục Vật Tư miền Nam và Tỉnh ủy, Ủy Ban Nhân dân cách mạng Tỉnh được thành lập ngày 17.02.1976 theo Quyết định số 37/VT-QL của Tổng Cục Vật Tư miền Nam đặt trụ sở tại thị xã Tân An với chức năng, nhiệm vụ cung ứng cho các đơn vị, xí nghiệp thuộc trung ương và địa phương trong phạm vi tỉnh Long An - Kiến Tường về các loại vật tư, thiết bị chủ yếu, thông dụng mà ngành vật tư được Nhà nước giao quản lý, cung ứng.
                                </p>
                                <p>
                                    Đến năm 1986 Ủy Ban Nhân dân (UBND) tỉnh Long An ban hành Quyết định số 885/UB.QĐ.86 ngày 23.4.1986 sáp nhập thêm hai đơn vị nữa là Công ty Vật tư Xây dựng thuộc Sở Xây dựng và Xí nghiệp cung ứng vật tư Công nghiệp thuộc Sở Công nghiệp vào Công ty Vật tư Tổng hợp trực thuộc UBND Tỉnh với nhiệm vụ chủ yếu là: Tổ chức sản xuất, thu mua, khai thác, tiếp nhận vật tư, vật liệu thuộc các ngành hàng: Xăng dầu, kim khí, hoá chất, vật liệu điện, thiết bị phụ tùng, dụng cụ cơ khí, vật liệu xây dựng, chất đốt…để phục vụ cho nhu cầu sản xuất và xây dựng trong Tỉnh; Cung ứng các loại vật tư, thiết bị và vật liệu xây dựng đầy đủ, kịp thời, đồng bộ đúng quy cách chủng loại cho các đơn vị sản xuất và các công trình xây dựng theo kế hoạch được giao.
                                </p>
                                <p>
                                    Ngày 31.3.1990 Công ty Vật tư Tổng hợp Long An trực thuộc Bộ Thương mại theo Quyết định 244/HĐBT của Hội đồng Bộ trưởng.
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
                <Box px={4} pb={4}>
                    <TitleSection title={tPage('fuel-others')} mB={2} handleClick={() => navigate('/oil')} />
                    <Box pt={4}>
                        <div className="grid grid-cols-1 gap-3">
                            {
                                oilData.map((item, index) => (
                                    <Box key={index} onClick={() => navigate('/oil-detail')}>
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

export default OilDetailPage