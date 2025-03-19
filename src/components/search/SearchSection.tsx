import React from 'react'
import { Box, Input, useNavigate } from 'zmp-ui'

const SearchSection = () => {

    const navigate = useNavigate()

    return (
        <Box px={4} pt={4} className='bg-white transform -translate-y-4 rounded-t-lg' >
            <Input.Search
                onClick={() => navigate('/search')}
                placeholder="Tìm nhanh địa điểm, đặc sản..."
            />
        </Box>
    )
}

export default SearchSection