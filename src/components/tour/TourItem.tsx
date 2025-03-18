import { Icon } from '@iconify/react'
import React from 'react'
import { Box, useNavigate } from 'zmp-ui'

const TourItem: React.FC<any> = ({ data }) => {

    const navigate = useNavigate()
    
    return (
        <Box className='border-[1px] rounded-lg' onClick={() => navigate(`/tour-detail/?id=${data.id}`)}>
            <img className='w-full h-[210px] object-cover rounded-lg' src={data.imgUrl} alt={data.title} />
            <Box px={3} py={4}>
                <h3 className='text-[16px] font-bold text-[#355933] line-clamp-1 mb-2'>{data.title}</h3>
                <ul className='flex flex-col gap-1 text-[14px] leading-[18px] font-medium'>
                    <li className='flex items-center gap-1'>
                        <Icon className='w-[20px]' icon='mdi:place-outline' />
                        {data.place} địa điểm
                    </li>
                    <li className='flex items-center gap-1'>
                        <Icon className='w-[20px]' icon='material-symbols:date-range-outline' />
                        {data.date} ngày
                    </li>

                </ul>
            </Box>
            <Box p={4} className='border-t-[1px]'>
                <div className='text-[16px] leading-[1] text-[#355933] font-bold'>{data.price}</div>
            </Box>
        </Box>
    )
}

export default TourItem