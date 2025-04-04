import { Divider } from 'components/divider'
import { FavoriteItem } from 'components/favorite'
import { HeaderSub } from 'components/header-sub'
import FilterBar from 'components/table/FilterBar'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Input, Page, Select } from 'zmp-ui'

export const favorite = [
  {
    title: 'Nhà Trăm Cột',
    img: 'https://ik.imagekit.io/tvlk/blog/2023/11/nha-tram-cot-cover.jpg',
    category: 'Điểm đến nổi bật',
    favoriteIcon: 'https://cdn-icons-png.flaticon.com/128/6460/6460112.png',
    infoIcon: 'https://cdn-icons-png.flaticon.com/128/1620/1620735.png',
  },
  {
    title: 'Tour 2 ngày 1 đêm- khách nội địa',
    img: 'https://scontent.iocvnpt.com/resources/portal//Images/LAN/trietnm.lan/duc_hoa/lang_co_phuoc_loc_tho/cropper_637189358343630424.jpg',
    category: 'Tour du lịch',
    favoriteIcon: 'https://cdn-icons-png.flaticon.com/128/6460/6460112.png',
    infoIcon: 'https://cdn-icons-png.flaticon.com/128/1620/1620735.png',
  },
  {
    title: 'Cánh đồng bất tận',
    img: 'https://scontent.iocvnpt.com/resources/portal//Images/LAN/toanlm.lan/hinh_diem/khudulichcanhdongbattan_263205966.jpg',
    category: 'Điểm du lịch',
    favoriteIcon: 'https://cdn-icons-png.flaticon.com/128/6460/6460112.png',
    infoIcon: 'https://cdn-icons-png.flaticon.com/128/1620/1620735.png',
  },
  {
    title: 'Lẩu mắm Long An',
    img: 'https://cdn.buffetposeidon.com/app/media/uploaded-files/110724-lau-mam-mien-tay-cung-buffet-poseidon-1-1.jpg',
    category: 'Đặc sản',
    favoriteIcon: 'https://cdn-icons-png.flaticon.com/128/6460/6460112.png',
    infoIcon: 'https://cdn-icons-png.flaticon.com/128/1620/1620735.png',
  },
]

const FavoritePage = () => {
  const { Option } = Select
  const { t } = useTranslation('common')

  return (
    <Page className="relative flex-1 flex flex-col bg-white pb-[62px]">
      <Box>
        <HeaderSub title={t('favorites')} />
        <Box>
          <Box>
            <FilterBar
              showAddButton={false}
              searchComponent={
                <Input.Search placeholder={t('searching')} value={''} />
              }
            >
              <div className="col-span-12">
                <Select placeholder="Danh mục" closeOnSelect>
                  <Option title={'Tất cả'} value={0} />
                  <Option title={'Nổi tiếng'} value={1} />
                </Select>
              </div>
            </FilterBar>
          </Box>
          <Box px={4}>
            {favorite.map((item, index) => (
              <Box mb={6} key={index}>
                <FavoriteItem
                  image={item.img}
                  category={item.category}
                  title={item.title}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Page>
  )
}

export default FavoritePage
