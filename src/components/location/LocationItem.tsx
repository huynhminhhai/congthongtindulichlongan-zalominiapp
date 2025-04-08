import NearLocation from 'components/near'
import React from 'react'
import { Box, useNavigate } from 'zmp-ui'

const LocationItem: React.FC<any> = ({ data }) => {
  const navigate = useNavigate()

  return (
    <Box
      className="relative w-full h-[200px] rounded-lg overflow-hidden"
      onClick={() => navigate(`/location/${data.id}`)}
    >
      {/* <NearLocation /> */}
      <img
        className="h-full w-full object-cover"
        src={data.imgUrl}
        alt="destination"
      />
      <div className="absolute w-full bottom-0 left-0 p-3 bg-[#365140e6]">
        <h3 className="text-[16px] leading-[24px] font-semibold text-[#fff] line-clamp-1">
          {data.title}
        </h3>
      </div>
    </Box>
  )
}

export default LocationItem
