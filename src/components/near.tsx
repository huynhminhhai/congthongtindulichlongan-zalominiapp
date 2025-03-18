import React from 'react'

const NearLocation = () => {
    return (
        <div className="near flex items-center gap-[6px] absolute top-[4px] right-[4px] bg-white p-1">
            <img className='w-[12px] h-auto' src="https://cdn-icons-png.flaticon.com/128/1483/1483336.png" alt="distance" />
            <span className='text-[12px] font-semibold'>0.3km</span>
        </div>
    )
}

export default NearLocation