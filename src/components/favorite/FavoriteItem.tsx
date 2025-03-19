import { Icon } from '@iconify/react'
import React from 'react'
import { Box } from 'zmp-ui'

const FavoriteItem: React.FC<any> = ({ data }) => {

    return (
        <Box className='border-[1px] rounded-lg'>
            <img className='w-full h-[210px] object-cover rounded-lg' src={data.img} alt={data.title} />
            <Box px={3} py={4}>
                <h3 className='text-[16px] font-bold text-[#355933] line-clamp-1 mb-2'>{data.title}</h3>
                <ul className='flex flex-col gap-1 text-[14px] leading-[18px] font-medium'>
                    <li className='flex items-center gap-1'>
                        <Icon fontSize={24} icon='codicon:tag' />
                        {data.category}
                    </li>
                </ul>
                <div className="actions flex items-center justify-end" onClick={() => console.log('remove form favorite list')}>
                    <button className="btn-bookmark active"><img className='w-[30px]' src="https://cdn-icons-png.flaticon.com/128/6460/6460112.png" alt="mục yêu thích" /></button>
                </div>
            </Box>
        </Box>
    )
}

export default FavoriteItem