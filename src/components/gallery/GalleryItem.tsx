import { Icon } from '@iconify/react'
import React from 'react'
import { Box, useNavigate } from 'zmp-ui'

const DestinationItem: React.FC<any> = ({data}) => {

    const navigate = useNavigate()

    return (
        <Box className='relative w-full h-[240px] rounded-lg overflow-hidden' onClick={() => navigate('/gallery-detail')}>
            <img className='h-full w-full object-cover' src={data.img} alt="destination" />
            <div className='absolute w-full bottom-0 left-0 p-4 bg-[#365140e6]'>
                <h3 className='text-[18px] leading-[24px] font-semibold text-[#fff] flex items-center gap-2'>
                    <span>
                        {
                            data.category === 1 ? <Icon fontSize={22} icon={'nrk:gallery'} /> : <Icon fontSize={22} icon={'icon-park-outline:video'} />
                        }
                    </span>
                    <span className='line-clamp-1'>
                        {data.title}
                    </span>
                </h3>
            </div>
        </Box>
    )
}

export default DestinationItem