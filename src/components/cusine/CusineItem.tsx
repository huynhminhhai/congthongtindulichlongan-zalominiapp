import NearLocation from 'components/near'
import React from 'react'
import { Box, useNavigate } from 'zmp-ui'

const CusineItem: React.FC<any> = ({ data }) => {

    const navigate = useNavigate()

    return (
        <Box onClick={() => navigate(`/cusine-detail/?id=${data.id}`)} className='relative'>
            {/* <NearLocation /> */}
            <div className='h-[200px] w-full'>
                <img className='w-full h-full object-cover' src={data.imgUrl} alt={data.title} />
            </div>
            <div className='cusine-category text-[12px] text-[#355933] font-medium mt-3'>Đặc sản</div>
            <h3 className='text-[22px] leading-[32px] font-semibold mb-1 line-clamp-1'>{data.title}</h3>
            <p className='line-clamp-2 text-[14px] leading-[22px]'>{data.desc}</p>
        </Box>
    )
}

export default CusineItem