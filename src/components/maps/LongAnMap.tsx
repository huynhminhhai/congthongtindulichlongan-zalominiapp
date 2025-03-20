import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Tabs } from 'zmp-ui';
import 'leaflet-search/dist/leaflet-search.min.css';
import images from 'assets/images';
import { openUrlInWebview } from 'services/zalo';

interface Location {
    lat: number;
    lng: number;
    name: string;
    address: string;
    img: string;
}

interface Locations {
    [key: string]: Location[];
}

interface Icons {
    [key: string]: string;
}

const LongAnMap: React.FC = () => {
    const mapRef = useRef<L.Map | null>(null);
    const markersRef = useRef<L.LayerGroup>(L.layerGroup());
    const [activeTab, setActiveTab] = React.useState<string>('tourist');

    const locations: Locations = {
        
        tourist: [
            {
                "lat": 10.725328531863696,
                "lng": 106.0848699385032,
                "name": "Cánh đồng bất tận",
                "address": "KP3, Bình Phong Thạnh, Mộc Hóa, Long An, Việt Nam",
                "img": "https://vinhtour.vn/wp-content/uploads/2024/09/VT_Khu-Du-Lich-Canh-Dong-Bat-Tan-Long-An-Ve-Dep-Moc-Mac-Dam-Chat-Tay-Nam-Bo1.jpg"
            },
            {
                "lat": 10.533333,
                "lng": 106.416667,
                "name": "Nhà trăm cột",
                "address": "Ấp Cầu Ngang, xã Long Hựu Đông, huyện Cần Đước, Long An, Việt Nam",
                "img": "https://ik.imagekit.io/tvlk/blog/2023/11/nha-tram-cot-cover.jpg"
            },
            {
                "lat": 10.616667,
                "lng": 106.233333,
                "name": "Khu du lịch sinh thái Làng Tre",
                "address": "Ấp Tân Lợi, xã Tân Thạnh, huyện Tân Thạnh, Long An, Việt Nam",
                "img": "https://baokhanhhoa.vn/file/e7837c02857c8ca30185a8c39b582c03/dataimages/201407/original/images973558_Cong_tre_vang.jpg"
            },
            {
                "lat": 10.800000,
                "lng": 106.616667,
                "name": "Happyland Long An",
                "address": "Xã Thạnh Đức, huyện Bến Lức, Long An, Việt Nam",
                "img": "https://r2.nucuoimekong.com/wp-content/uploads/khu-du-lich-happy-land.jpg"
            },
            {
                "lat": 10.416667,
                "lng": 106.016667,
                "name": "Rừng tràm Tân Lập",
                "address": "Xã Tân Lập, huyện Mộc Hóa, Long An, Việt Nam",
                "img": "https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2022/6/23/1059740/Content_3__Lang_Noi_.jpg"
            },
            {
                "lat": 10.533889,
                "lng": 106.408333,
                "name": "Chùa Tôn Thạnh",
                "address": "Ấp Thanh Ba, xã Thanh Phú, huyện Cần Giuộc, Long An, Việt Nam",
                "img": "https://longan.dcs.vn/wps/wcm/connect/longan/5af5f179-5edc-414a-aa89-da632924430b/1/32_Chua_Ton_Thanh_1.jpg?MOD=AJPERES&CVID="
            },
            {
                "lat": 10.966667,
                "lng": 106.666667,
                "name": "Khu di tích lịch sử Láng Sen",
                "address": "Xã Nhựt Chánh, huyện Bến Lức, Long An, Việt Nam",
                "img": "https://baotanghochiminh.vn/pic/News/images/Que%20noi.jpg"
            },
            {
                "lat": 10.583333,
                "lng": 106.400000,
                "name": "Công viên thành phố Tân An",
                "address": "Phường 1, thành phố Tân An, Long An, Việt Nam",
                "img": "https://nhadatlongan.net.vn/wp-content/uploads/2024/08/cong-vien-thanh-pho-tan-an.jpg"
            },
            {
                "lat": 10.683333,
                "lng": 106.566667,
                "name": "Làng nổi Tân Lập",
                "address": "Xã Long Hựu Tây, huyện Cần Đước, Long An, Việt Nam",
                "img": "https://www.kkday.com/vi/blog/wp-content/uploads/lang-noi-tanl-lap-4.jpg"
            },
            {
                "lat": 10.816667,
                "lng": 106.633333,
                "name": "Khu du lịch Cửa Lấp",
                "address": "Xã Tân Bửu, huyện Bến Lức, Long An, Việt Nam",
                "img": "https://tpiland.com/wp-content/uploads/2023/06/3-24-1024x584.webp"
            },
            {
                "lat": 10.466667,
                "lng": 106.316667,
                "name": "Đồng Tháp Mười",
                "address": "Xã Mỹ Hòa, huyện Thạnh Hóa, Long An, Việt Nam",
                "img": "https://iv.vnecdn.net/vnexpress/images/web/2022/07/02/trai-nghiem-dong-thap-muoi-xua-1656752822.jpg"
            },
            {
                "lat": 10.533333,
                "lng": 106.400000,
                "name": "Bảo tàng Long An",
                "address": "Đường Hùng Vương, phường 2, thành phố Tân An, Long An, Việt Nam",
                "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5-9rNi1R_7H_-hK4R_tDfrYeaKmq6wkkx-Q&s"
            },
            {
                "lat": 10.750000,
                "lng": 106.083333,
                "name": "Khu bảo tồn đất ngập nước Láng Sen",
                "address": "Xã Vĩnh Đại, huyện Tân Hưng, Long An, Việt Nam",
                "img": "https://ik.imagekit.io/tvlk/blog/2024/02/lang-sen-11.jpg?tr=q-70,c-at_max,w-500,h-300,dpr-2"
            },
            {
                "lat": 10.666667,
                "lng": 106.500000,
                "name": "Vườn chim Phước Lý",
                "address": "Ấp 3, xã Phước Lý, huyện Cần Giuộc, Long An, Việt Nam",
                "img": "https://hitour.vn/storage/images/upload/vuon-chim-bac-lieu-750.webp"
            },
            {
                "lat": 10.916667,
                "lng": 106.583333,
                "name": "Khu di tích Gò Công",
                "address": "Xã Đức Hòa Thượng, huyện Đức Hòa, Long An, Việt Nam",
                "img": "https://mia.vn/media/uploads/blog-du-lich/go-cong-tien-giang-vung-dat-cua-nhung-cong-trinh-kien-truc-co-dac-sac-15-1651485094.jpg"
            },
            {
                "lat": 10.700000,
                "lng": 106.566667,
                "name": "Chợ nổi Long Hựu",
                "address": "Xã Long Hựu Đông, huyện Cần Đước, Long An, Việt Nam",
                "img": "https://ik.imagekit.io/tvlk/blog/2023/09/cho-noi-long-xuyen.jpg"
            },
            {
                "lat": 10.433333,
                "lng": 106.033333,
                "name": "Hồ Sinh Thái Tân Lập",
                "address": "Xã Tân Lập, huyện Mộc Hóa, Long An, Việt Nam",
                "img": "https://datviettour.com.vn/uploads/images/mientay/long-an/hinh-danh-thang/canh-dong-bat-tan.png"
            },
            {
                "lat": 10.783333,
                "lng": 106.616667,
                "name": "Khu du lịch sinh thái Cát Tường Phú Sinh",
                "address": "Xã Mỹ Hạnh Bắc, huyện Đức Hòa, Long An, Việt Nam",
                "img": "https://dulichviet.com.vn/images/bandidau/kham-pha-khu-sinh-thai-cat-tuong-phu-sinh-cong-vien-the-gioi-thu-nho-hap-dan.jpg"
            },
            {
                "lat": 10.550000,
                "lng": 106.416667,
                "name": "Di tích lịch sử Bình Thành",
                "address": "Xã Bình Thành, huyện Tân Trụ, Long An, Việt Nam",
                "img": "https://dulichthuduc.com.vn/vnt_upload/news/MIEN-TAY/long-an/khu_di_tich_lich_su_binh_thanh_du_lich_thu_duc_1.jpg"
            },
            {
                "lat": 10.633333,
                "lng": 106.466667,
                "name": "Vườn trái cây Cần Giuộc",
                "address": "Xã Phước Hậu, huyện Cần Giuộc, Long An, Việt Nam",
                "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpnDQr9BF6-CuPzvlMpTChem-gMJJ2IaTjtA&s"
            },
            {
                "lat": 10.516667,
                "lng": 106.383333,
                "name": "Di tích chiến thắng Tầm Vu",
                "address": "Xã Tầm Vu, huyện Châu Thành, Long An, Việt Nam",
                "img": "https://dailytravelvietnam.com/vi/images/2016/02/di-tich-chien-thang-tam-vu.jpg"
            },
            {
                "lat": 10.650000,
                "lng": 106.483333,
                "name": "Chùa Phước Lâm",
                "address": "Xã Phước Lâm, huyện Cần Giuộc, Long An, Việt Nam",
                "img": "https://cdn.xanhsm.com/2025/02/3033b443-chua-phuoc-lam-hoi-an-1.jpg"
            },
            {
                "lat": 10.733333,
                "lng": 106.050000,
                "name": "Khu du lịch sinh thái Đồng Tháp Mười",
                "address": "Xã Tân Hưng, huyện Tân Hưng, Long An, Việt Nam",
                "img": "Khu du lịch sinh thái Đồng Tháp Mười"
            },
            {
                "lat": 10.883333,
                "lng": 106.600000,
                "name": "Làng cổ Phước Lộc Thọ",
                "address": "Xã Hựu Thạnh, huyện Đức Hòa, Long An, Việt Nam",
                "img": "https://ik.imagekit.io/tvlk/blog/2024/02/lang-co-phuoc-loc-tho-1-1024x753.jpg?tr=q-70,c-at_max,w-500,h-300,dpr-2"
            },
            {
                "lat": 10.566667,
                "lng": 106.433333,
                "name": "Đình Vĩnh Nghiêm",
                "address": "Phường 5, thành phố Tân An, Long An, Việt Nam",
                "img": "https://www.phattuvietnam.net/wp-content/uploads/2020/01/chua_vinh_nghiem_fqin_thumb.jpg"
            },
            {
                "lat": 10.683333,
                "lng": 106.533333,
                "name": "Khu du lịch sinh thái Vàm Cỏ",
                "address": "Xã Long Hựu Tây, huyện Cần Đước, Long An, Việt Nam",
                "img": "https://scontent.iocvnpt.com/resources/portal//Images/LAN/toanlm.lan/1_58909171.jpg"
            },
            {
                "lat": 10.450000,
                "lng": 106.066667,
                "name": "Cánh đồng sen Thạnh Hóa",
                "address": "Xã Thủy Tây, huyện Thạnh Hóa, Long An, Việt Nam",
                "img": "https://www.baolongan.vn/image/news/2016/20160423/fckimage/3923_2-1461146906.jpg"
            },
            {
                "lat": 10.766667,
                "lng": 106.666667,
                "name": "Khu công nghiệp Long Hậu",
                "address": "Xã Long Hậu, huyện Cần Giuộc, Long An, Việt Nam",
                "img": "https://bicjsc.com/upload/3site/files/TinTucNoiBo/khu-cong-nghiep-long-hau-1-7632%20(1)(1).jpg"
            },
            {
                "lat": 10.616667,
                "lng": 106.266667,
                "name": "Kênh Rạch Cát",
                "address": "Xã Tân Thạnh, huyện Tân Thạnh, Long An, Việt Nam",
                "img": "https://scontent.iocvnpt.com/resources/portal//Images/LAN/trietnm.lan/Su%20Kien/don_rach_cat_348372740.jpg"
            },
            {
                "lat": 10.866667,
                "lng": 106.583333,
                "name": "Di tích chiến khu Đức Hòa",
                "address": "Xã Đức Hòa Hạ, huyện Đức Hòa, Long An, Việt Nam",
                "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk3EYpc2j-49lZrcJjxj9FORO6sksSBmsPbw&s"
            },
            {
                "lat": 10.700000,
                "lng": 106.516667,
                "name": "Cầu treo Long Hựu",
                "address": "Xã Long Hựu Đông, huyện Cần Đước, Long An, Việt Nam",
                "img": "https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2024/5/13/chiem-nguong-canh-sac-son-thuy-huu-tinh-ben-cay-cau-treo-pa-phong2-17155591693172130536617.jpg"
            },
            {
                "lat": 10.483333,
                "lng": 106.033333,
                "name": "Hồ Thủy Lợi Phước Tuy",
                "address": "Xã Phước Tuy, huyện Mộc Hóa, Long An, Việt Nam",
                "img": "https://luhanhvietnam.com.vn/du-lich/vnt_upload/news/09_2020/avartBYc_Ynh_sieu_chYt_vao_nhYng_ngay_trYi_YYp_nYYc_trong_YYp_xY_nYYc._Ynh_FB_QA-min.jpg"
            },
            {
                "lat": 10.816667,
                "lng": 106.650000,
                "name": "Khu du lịch sinh thái Tây Yên",
                "address": "Xã Tân Mỹ, huyện Đức Hòa, Long An, Việt Nam",
                "img": "https://example.com/tayyenecotourism.jpg"
            },
            {
                "lat": 10.566667,
                "lng": 106.400000,
                "name": "Sông Vàm Cỏ Đông",
                "address": "Phường 3, thành phố Tân An, Long An, Việt Nam",
                "img": "https://example.com/songvamcodong.jpg"
            },
            {
                "lat": 10.650000,
                "lng": 106.450000,
                "name": "Chùa Linh Nghiêm",
                "address": "Xã Phước Vĩnh Đông, huyện Cần Giuộc, Long An, Việt Nam",
                "img": "https://example.com/chualinhnghiem.jpg"
            },
            {
                "lat": 10.733333,
                "lng": 106.083333,
                "name": "Vườn hoa kiểng Tân Hưng",
                "address": "Xã Vĩnh Châu A, huyện Tân Hưng, Long An, Việt Nam",
                "img": "https://example.com/vuonhoakiengtanhung.jpg"
            },
            {
                "lat": 10.916667,
                "lng": 106.633333,
                "name": "Khu du lịch sinh thái Đức Hòa",
                "address": "Xã Đức Lập Hạ, huyện Đức Hòa, Long An, Việt Nam",
                "img": "https://example.com/duchoaecotourism.jpg"
            },
            {
                "lat": 10.533333,
                "lng": 106.433333,
                "name": "Công viên Cá Koi Tân An",
                "address": "Phường 6, thành phố Tân An, Long An, Việt Nam",
                "img": "https://example.com/congviencakoi.jpg"
            },
            {
                "lat": 10.683333,
                "lng": 106.583333,
                "name": "Làng nghề đan lát Long Hựu",
                "address": "Xã Long Hựu Tây, huyện Cần Đước, Long An, Việt Nam",
                "img": "https://example.com/langnghelatlonghuu.jpg"
            }
        ],

        restaurant: [
            {
                lat: 10.5333,
                lng: 106.4167,
                name: 'Nhà Hàng Sân Golf West Lakes',
                address: 'Số 145, ĐT822, ấp Chánh, Đức Hòa, Long An Tỉnh Long An',
                img: 'https://file.hstatic.net/200000844097/file/st-lakes-golf-_-villas-goda-golf__27__6fcee2c4056e477cac6b367fb45011f2.png',
            },
            {
                lat: 10.63054139415159,
                lng: 106.49339875274006,
                name: 'Hải sản Hoàng',
                address: '133 Đường Phan Văn Mãng, KP9, Thị trấn Bến Lức, Tỉnh Long An',
                img: 'https://lh4.googleusercontent.com/proxy/1kWPmEJzM6rbgs0UMGzb9Wbd-mWw-PBlMjSNHHoUvJ7vqU8ZndjLHdo9lRdvR0Uzu3B6Da5DeFSJcESahFUPSVPqL0GaAzXbDHXFnw5djkkepJOU9pE0FyeLnHKPTHzG3so6tvXigKnW_so4kAlh7owKkQ',
            },
            {
                lat: 10.570290664349153,
                lng: 106.71964416547408,
                name: 'Tiến thành boats',
                address: 'Ấp thạnh trung, Phước Vĩnh Đông, Cần Giuộc, Long An, Việt Nam',
                img: 'https://scontent.iocvnpt.com/resources/portal//Images/LAN/bangdc.lan/tienthanhboat/thumb/275123386_126484249944621_2786125216814893871_n_161423593.jpg'
            },
            {
                lat: 10.641977731336201,
                lng: 106.495901595069,
                name: 'Hải Sản Phú Quý',
                address: '09 Đường số 1, KDC Đường 10, Bến Lức, Long An 82600, Việt Nam',
                img: 'https://scontent.iocvnpt.com/resources/portal/Images/LAN/vamcofarmstay/hai_san_phu_quy/hai_san_phu_quy_11_521496205.jpg'
            },
            {
                lat: 10.54783614545623,
                lng: 106.40186110856092,
                name: 'Cua Cốm Restaurant Tân An',
                address: '22 Đ. Phân Khu Nam, Phường 2, Tân An, Long An, Việt Nam',
                img: 'https://thethaovanhoa.mediacdn.vn/Upload/uJjLuL2HhNU2U6UnlwA/files/2019/05/31/Hinh%20cua%202_Fotor.jpg'
            },
            {
                lat: 10.523337233814733,
                lng: 106.39126435382593,
                name: 'Quán Lẩu - Nướng Cá Chèo Bẻo',
                address: '496 QL1A, Phường 4, Tân An, Long An, Việt Nam',
                img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB-pqvNB4y6luuilK79kdCy7HscEUsRipcNw&s'
            },
            {

                lat: 10.541567440394875,
                lng: 106.39749176623216,
                name: 'Nhà Hàng Samba',
                address: '58 Đ. Nguyễn Văn Tạo, Phường 4, Tân An, Long An, Việt Nam',
                img: 'https://hotel84.com/hotel84-images/news/img1/nha-hang-Samba.jpg'
            },
            {
                lat: 10.602102666151701,
                lng: 106.6818523662329,
                name: 'Nhà hàng Lu Xưa',
                address: 'Nguyễn Thị Bẹ, ấp Lũy, Cần Giuộc, Long An 850000, Việt Nam',
                img: 'https://hotel84.com/hotel84-images/news/photo/nha-hang-lu-xua.jpg'
            },
            {
                lat: 10.591480794749284,
                lng: 106.67662845273966,
                name: 'Mộc Korean BBQ',
                address: 'khu dân cư, D6/đường Tân Phú Thịnh, khu phố Phước Thuận, Cần Giuộc, Long An 82500, Việt Nam',
                img: 'https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/478945ZKX/anh-mo-ta.png'
            },
            {
                lat: 10.607280353845585,
                lng: 106.66669328391026,
                name: 'Nhà Hàng Mỹ Yến',
                address: 'Đ. Nguyễn Thái Bình, Khu phố 4, Cần Giuộc, Long An 853100, Việt Nam',
                img: 'https://nhahangmyyen.com/wp-content/uploads/2023/08/240604843_195257076071390_7130880707043214558_n.jpg'
            },
            {
                lat: 10.660676137938253,
                lng: 106.46673365838163,
                name: 'Tiệm ăn Síu Lập Nam Long',
                address: 'ĐT830, An Thạnh, Bến Lức, Long An, Việt Nam',
                img: 'https://www.baolongan.vn/image/news/2021/20210124/images/ti%E1%BB%87m%20s%C3%ADu%20l%E1%BA%ADp.jpg'
            },
            {
                lat: 10.654602931459841,
                lng: 106.50261088475806,
                name: 'Nhà hàng Vườn Cò',
                address: '327 Nguyễn Hữu Trí, Thanh Phú, Bến Lức, Long An, Việt Nam',
                img: 'https://channel.mediacdn.vn/2021/12/21/photo-1-1640097994005726386149.jpg'
            },
            {
                lat: 10.523444761186644,
                lng: 106.42162317818187,
                name: 'Nhà hàng Beluga',
                address: '136 ĐT827, Phường 3, Tân An, Long An, Việt Nam',
                img: 'https://lh5.googleusercontent.com/p/AF1QipOvUQJNDNIdU7dJ51KTvCzUIh_vLdiAJWDSWWC4'
            },
            {
                lat: 10.548801704902491,
                lng: 106.39951345321556,
                name: 'Quán Cơm Nhà',
                address: 'Đ. Hùng Vương, Phường 2, h. Tân Trụ, Long An, Việt Nam',
                img: 'https://scontent.iocvnpt.com/resources/portal//Images/LAN/sangvt.lan/tien_ich/dia_diem/nha_la/1_637196288358383080.jpg'
            },
            {
                lat: 10.552136,
                lng: 106.414512,
                name: "Nhà Hàng Sen Đồng",
                address: "67 Đường 827, Phường 2, Tân An, Long An, Việt Nam",
                img: "https://mediatuongtac.mediatech.vn//upload/image/202302/medium/fc973c3285ee7ee0f4356e27d9668fb3.jpg"
            },
            {
                lat: 10.565214,
                lng: 106.422154,
                name: "Lẩu Dê Hồng Phát",
                address: "23 Nguyễn Đình Chiểu, Phường 3, Tân An, Long An, Việt Nam",
                img: "https://decuu.com.vn/uploads/file/baiviet/1-de-lam-son-826272.jpg"
            },
            {
                lat: 10.580214,
                lng: 106.450321,
                name: "Nhà Hàng Hương Biển",
                address: "45 Trần Hưng Đạo, Bến Lức, Long An, Việt Nam",
                img: "https://flchotelsresorts.com/images/foods/2022/05/19/resize/2021-04-29-19-02-40-624_1652953044.jpg"
            },
            {
                lat: 10.610432,
                lng: 106.483012,
                name: "Quán Lẩu Nướng 123",
                address: "128 Quốc Lộ 1A, Cần Giuộc, Long An, Việt Nam",
                img: "https://digiticket.vn/blog/wp-content/uploads/2022/07/quan-nuong-pham-van-dong-2.jpg"
            },
            {
                lat: 10.595212,
                lng: 106.502541,
                name: "Nhà Hàng Hải Sản Tươi Sống",
                address: "19 Nguyễn Văn Tạo, Cần Giuộc, Long An, Việt Nam",
                img: "https://menuonline.vn/public/responsive_filemanager/source/tin-tuc/nha-hang-hai-san-ngon/nha-hang-hai-san-1.jpg"
            },
            {
                lat: 10.622314,
                lng: 106.470215,
                name: "Nhà Hàng Gà Nướng Cô Ba",
                address: "56 Lê Văn Lương, Bến Lức, Long An, Việt Nam",
                img: "https://mms.img.susercontent.com/vn-11134259-7r98o-lwb72l7huxgb58@resize_ss1242x600!@crop_w1242_h600_cT"
            },
            {
                lat: 10.550212,
                lng: 106.410541,
                name: "Quán Ẩm Thực Miền Tây",
                address: "99 Nguyễn Văn Linh, Tân An, Long An, Việt Nam",
                img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPu3CnJqQP0ipb1PfmsqF8-vVMOCkAIwBM6w&s"
            },
            {
                lat: 10.562341,
                lng: 106.432198,
                name: "Nhà Hàng Chay An Lạc",
                address: "12 Lê Lợi, Phường 1, Tân An, Long An, Việt Nam",
                img: "https://congchungnguyenvietcuong.com/Uploaded/Images/Original/2024/04/20/nha-hang-buffet-chay-an-lac-663640_2004085119.jpg"
            },
            {
                lat: 10.643214,
                lng: 106.480315,
                name: "Quán Ăn Gia Đình Nấm",
                address: "79 Trường Chinh, Bến Lức, Long An, Việt Nam",
                img: "https://gcs.tripi.vn/public-tripi/tripi-feed/img/473890VvJ/1-nha-hang-com-xua.jpg"
            },
            {
                lat: 10.590321,
                lng: 106.522101,
                name: "Nhà Hàng Hoàng Yến",
                address: "33 Lê Thị Hồng Gấm, Cần Đước, Long An, Việt Nam",
                img: "https://hoangyencuisine.com/wp-content/uploads/2014/11/MG_5617-logo.jpg"
            }
        ],

        hotel: [
            {
                "lat": 10.670525872464392,
                "lng": 106.48918070856237,
                "name": "HOMESTAY VÀM CỎ FARMSTAY",
                "address": "Đường Rạch Tre, ấp 5, xã An Thạnh, huyện Bến Lức, tỉnh Long An",
                "img": "https://scontent.iocvnpt.com/resources/portal//Images/LAN/toansauconkun994/thumb/1_647964214.jpg"
            },
            {
                "lat": 10.529444,
                "lng": 106.406111,
                "name": "Khách sạn Ngọc Lan",
                "address": "Số 123, đường Hùng Vương, phường 2, thành phố Tân An, tỉnh Long An",
                "img": "https://i0.wp.com/ngoclanhotel.com.vn/wp-content/uploads/2018/10/khach-san-ngoc-lan-quan-11.jpg?fit=1280%2C851"
            },
            {
                "lat": 10.749722,
                "lng": 105.939167,
                "name": "The Endless Field Homestay",
                "address": "Ấp 3, xã Bình Phong Thạnh, huyện Mộc Hóa, tỉnh Long An",
                "img": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/30/47/2c/caption.jpg?w=900&h=500&s=1"
            },
            {
                "lat": 10.965278,
                "lng": 106.668611,
                "name": "Khách sạn Hoàng Long",
                "address": "Quốc lộ 1A, xã Nhựt Chánh, huyện Bến Lức, tỉnh Long An",
                "img": "https://q-xx.bstatic.com/xdata/images/hotel/max500/382623755.jpg?k=4fd5f5357b2f03aeaa7037ae6c2654814f3dc3a6aef97badb04e72e2786300f5&o="
            },
            {
                "lat": 10.533889,
                "lng": 106.413056,
                "name": "Nhà nghỉ Tân An",
                "address": "Đường Nguyễn Đình Chiểu, phường 3, thành phố Tân An, tỉnh Long An",
                "img": "https://cf.bstatic.com/xdata/images/hotel/max1024x768/491173830.webp?k=cde3fa554818fb8cca8d9626d28d010e230a82d0f6c8465b0c2acf561eee3c87&o="
            },
            {
                "lat": 10.813611,
                "lng": 106.619444,
                "name": "West Lakes Golf & Villas",
                "address": "145 Tỉnh lộ 822, xã Tân Mỹ, huyện Đức Hòa, tỉnh Long An",
                "img": "https://golfgroup.com.vn/wp-content/uploads/2021/07/san-golf-west-lake-1.jpg"
            },
            {
                "lat": 10.620833,
                "lng": 106.220278,
                "name": "Homestay Cồn Phụng",
                "address": "Ấp Tân Thành, xã Tân Thạnh, huyện Tân Thạnh, tỉnh Long An",
                "img": "https://conphungtourist.com/wp-content/uploads/2023/03/coco-island-con-phung-ben-tre1.jpg"
            },
            {
                "lat": 10.537500,
                "lng": 106.408333,
                "name": "Khách sạn Sông Vàm",
                "address": "Đường Nguyễn Trung Trực, phường 2, thành phố Tân An, tỉnh Long An",
                "img": "https://du-lich.chudu24.com/f/m/1608/03/khach-san-cong-doan-ha-long-0.jpg"
            },
            {
                "lat": 10.691667,
                "lng": 106.573611,
                "name": "Homestay Làng Tre",
                "address": "Ấp 2, xã Long Hựu Đông, huyện Cần Đước, tỉnh Long An",
                "img": "https://i.ex-cdn.com/mientay.giadinhonline.vn/files/content/2022/02/23/homestay-ct-2242.jpeg"
            },
            {
                "lat": 10.916667,
                "lng": 106.583333,
                "name": "Khách sạn Minh Anh",
                "address": "Quốc lộ 62, thị trấn Đức Hòa, huyện Đức Hòa, tỉnh Long An",
                "img": "https://i.vntrip.vn/471x290/smart/https://statics.vntrip.vn/data-v2/hotels/1636/img_max/1636_1461139612274_288993_14072813310020518383.jpg"
            },
            {
                "lat": 10.433333,
                "lng": 105.983333,
                "name": "Homestay Đồng Tháp Mười",
                "address": "Xã Tân Lập, huyện Mộc Hóa, tỉnh Long An",
                "img": "https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2022/11/23/1119820/Dong-Thap-2.jpg"
            },
            {
                "lat": 10.583333,
                "lng": 106.416667,
                "name": "Nhà nghỉ Bình Minh",
                "address": "Đường Lê Lợi, phường 1, thành phố Tân An, tỉnh Long An",
                "img": "https://cf.bstatic.com/xdata/images/hotel/max1024x768/100840999.jpg?k=92e8f9bb96779179cff55f6ed124990bbae828a6baf5f053f437a98a8ee44636&o=&hp=1"
            },
            {
                "lat": 10.766667,
                "lng": 106.666667,
                "name": "Khách sạn Phúc Thịnh",
                "address": "Quốc lộ 1A, xã Long Hiệp, huyện Bến Lức, tỉnh Long An",
                "img": "https://i.vntrip.vn/800x550/smart/https://statics.vntrip.vn/data-v2/hotels/5534/img_max/5C921F6F16F942E5B08E_48657330.jpg"
            },
            {
                "lat": 10.833333,
                "lng": 106.633333,
                "name": "Khu nghỉ dưỡng Happy Land",
                "address": "Xã Thạnh Đức, huyện Bến Lức, tỉnh Long An",
                "img": "https://zoomtravel.vn/upload/news/khu-du-lich-happyland32330.jpg"
            },
            {
                "lat": 10.666667,
                "lng": 106.500000,
                "name": "Homestay Vườn Xoài",
                "address": "Ấp 4, xã Phước Lý, huyện Cần Giuộc, tỉnh Long An",
                "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjBolP7QJeCEymZa9HH_V9pgTD16pR_a0IMQ&s"
            },
            {
                "lat": 10.950000,
                "lng": 106.716667,
                "name": "Khách sạn Tân Đức",
                "address": "Đường Tỉnh lộ 835, xã Đức Lập Thượng, huyện Đức Hòa, tỉnh Long An",
                "img": "https://image.vietgoing.com/hotel/03/70/medium/vietgoing_jtz2303147188.webp"
            },
            {
                "lat": 10.483333,
                "lng": 106.316667,
                "name": "Nhà nghỉ Hòa Bình",
                "address": "Xã Hòa Khánh Tây, huyện Đức Hòa, tỉnh Long An",
                "img": "https://pix10.agoda.net/hotelImages/159/15959672/15959672_20070816230091386205.jpg?ca=12&ce=1&s=414x232&ar=16x9"
            },
            {
                "lat": 10.716667,
                "lng": 105.966667,
                "name": "Homestay Rừng Tràm",
                "address": "Xã Tân Công Chí, huyện Tân Trụ, tỉnh Long An",
                "img": "https://artcoffee.vn/wp-content/uploads/chau-doc-homestay-an-giang-duoc-thiet-ke-bang-tre-go-xung-quanh-la-san-vuon-nen-khong-khi-trong-lanh-mat-me-1024x498-1.jpg"
            },
            {
                "lat": 10.533333,
                "lng": 106.400000,
                "name": "Khách sạn Long An",
                "address": "Đường Trương Định, phường 1, thành phố Tân An, tỉnh Long An",
                "img": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/f0/3a/9b/phu-thang-grand-hotel.jpg?w=1200&h=-1&s=1"
            },
            {
                "lat": 10.800000,
                "lng": 106.600000,
                "name": "Khu nghỉ dưỡng Cửa Lấp",
                "address": "Xã Tân Bửu, huyện Bến Lức, tỉnh Long An",
                "img": "https://owa.bestprice.vn/images/hotels/uploads/amarin-resort-phu-quoc-643e18c1f1699.jpg"
            }
        ],
        
        bus: [
            {
                lat: 10.537756992964985,
                lng: 106.40477113174349,
                name: 'Bến xe Long An',
                address: '68/48, Hẻm, 68 Đ. Hùng Vương, Phường 2, Tân An, Long An, Việt Nam',
                img: 'https://lh5.googleusercontent.com/p/AF1QipOiLB-YjvNrtDq57hKeypJC61pjiU2E2rghlebz=w408-h306-k-no',
            },
        ],
        atm: [],
        hospital: [],
        oil: [],
        taxi: [],
        shopping: []
    };

    const icons: Icons = {
        tourist: images.markerTravel,
        restaurant: images.markerRestaurant,
        hotel: images.markerHotel,
        bus: images.markerBus,
        atm: images.markerAtm,
        hospital: images.markerHospital,
        oil: images.markerOil,
        taxi: images.markerTaxi,
        shopping: images.markerShopping,
    };

    useEffect(() => {
        import('leaflet-search').then(() => {
            if (!mapRef.current) {
                mapRef.current = L.map('map').setView([10.5333, 106.4167], 10);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                }).addTo(mapRef.current);

                markersRef.current.addTo(mapRef.current);
            }
            loadMarkers(activeTab);
            addSearchControl();
        }).catch((err) => {
            console.error('Failed to load leaflet-search:', err);
        });

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [activeTab]);

    const loadMarkers = (type: string) => {
        if (!mapRef.current) return;

        markersRef.current.clearLayers();

        const icon = L.icon({
            iconUrl: icons[type],
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32],
        });

        const items = locations[type];

        if (items.length === 0) {
            mapRef.current.setView([10.5333, 106.4167], 10);
            return;
        }

        const bounds = L.latLngBounds(
            items.map((item: Location) => [item.lat, item.lng])
        );

        items.forEach((item: Location) => {
            const marker = L.marker([item.lat, item.lng], { icon, title: item.name })
                .addTo(markersRef.current)
                .bindPopup(`
          <div style="width: 180px">
            <div class="card-img">
              <img style="width: 100%; height: 100px" src="${item.img}" alt="${item.name}" />
            </div>
            <div style="padding-block: 6px;">
              <div style="color: #355933; font-size: 15px; font-weight: 600; margin-bottom: 2px;">${item.name}</div>
              <div style="font-size: 11px;">
                <div style="margin-bottom: 4px;"><strong>Địa chỉ:</strong> ${item.address}</div>
                <button style="line-height: 1; padding: 6px; background-color: #355933; border-radius: 4px; color: #fff;" class="google-maps-link">Chỉ đường</button>
              </div>
            </div>
          </div>
        `);

            marker.on('popupopen', () => {
                const googleMapsLink = (marker.getPopup() as any).getElement()?.querySelector('.google-maps-link');
                if (googleMapsLink) {
                    googleMapsLink.addEventListener('click', () => openGoogleMaps(item.lat, item.lng));
                }
            });
        });

        if (bounds.isValid()) {
            mapRef.current.fitBounds(bounds, { paddingTopLeft: [0, 100], maxZoom: 14 });
        }
    };

    const openGoogleMaps = async (lat, lng) => {
        const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
        await openUrlInWebview(googleMapsUrl, 'bottomSheet');  // Sử dụng hàm openUrlInWebview để mở Google Maps
    };

    const addSearchControl = () => {
        if (!mapRef.current) return;

        const SearchControl = (L.Control as any).Search;

        if (!SearchControl) {
            console.error('Leaflet Search plugin is not loaded.');
            return;
        }

        const searchControl = new SearchControl({
            layer: markersRef.current,
            initial: false,
            propertyName: 'title',
            marker: false,
            caseSensitive: false,
            filter: function (searchText: string, marker: any) {
                return marker.options.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
            },
            moveToLocation: function (latlng: L.LatLng, name: string, map: L.Map) {
                map.setView(latlng, 15);
                markersRef.current.eachLayer(function (layer: any) {
                    if ((layer as L.Marker).options.title === name) {
                        (layer as L.Marker).openPopup();
                    }
                });
            },
            textPlaceholder: 'Tìm kiếm địa điểm...',
            textErr: 'Không tìm thấy địa điểm',
            textCancel: 'Hủy',
        });

        mapRef.current.addControl(searchControl);
    };

    const handleItemClick = (lat: number, lng: number) => {
        if (!mapRef.current) return;

        mapRef.current.setView([lat, lng], 15);
        markersRef.current.eachLayer((marker: any) => {
            const markerLatLng = marker.getLatLng();
            if (markerLatLng.lat === lat && markerLatLng.lng === lng) {
                marker.openPopup();
            }
        });
    };

    return (
        <div className="map-wrap">
            <div className="sidebar">
                <Tabs
                    activeKey={activeTab}
                    onChange={(key) => setActiveTab(key)}
                    scrollable
                >
                    {Object.keys(icons).map((type: string) => (
                        <Tabs.Tab
                            key={type}
                            label={<img src={icons[type]} alt={type} className="tab-icon w-[52px]" />}
                        >
                            <div className="p-2 flex flex-col gap-2 max-h-[160px] overflow-y-auto mb-2">
                                {locations[type].map((item: Location, index: number) => (
                                    <div
                                        key={index}
                                        className="flex gap-2"
                                        onClick={() => handleItemClick(item.lat, item.lng)}
                                    >
                                        <img className="w-[100px] h-[60px] object-cover" src={item.img} alt={item.name} />
                                        <div className='flex-1'>
                                            <div className="text-[16px] leading-[24px] font-bold text-[#355933] line-clamp-1">{item.name}</div>
                                            <div className="text-[12px] leading-[16px] font-medium line-clamp-2">{item.address}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Tabs.Tab>
                    ))}
                </Tabs>
            </div>
            <div id="map" style={{ height: '400px' }}></div>
        </div>
    );
};

export default LongAnMap;
