import { Icon } from '@iconify/react'
import NearLocation from 'components/near'
import React from 'react'
import { Box, useNavigate } from 'zmp-ui'

const BusItem: React.FC<any> = ({ data }) => {

    const navigate = useNavigate()

    return (
        <Box className='border-[1px] rounded-lg relative' onClick={() => navigate('/bus-routing-detail')}>
            {/* <NearLocation /> */}
            <img className='w-full h-[210px] object-cover rounded-lg' src={data.img} alt={data.name} />
            <Box px={3} py={4}>
                <h3 className='text-[16px] font-bold text-[#355933] line-clamp-1 mb-2'>{data.name}</h3>
                <ul className='flex flex-col gap-1 text-[14px] leading-[18px] font-medium'>
                    <li className='flex items-start gap-1'>
                        <Icon fontSize={18} className='mt-[1px]' icon='fluent:location-28-regular' />
                        <span className='flex-1 line-clamp-2'>
                            {data.time}
                        </span>
                    </li>
                </ul>
            </Box>
        </Box>
    )
}

export default BusItem