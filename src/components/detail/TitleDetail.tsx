import React from 'react'

const TitleDetail:React.FC<{title: string}> = ({title}) => {
    return (
        <h1 className="text-[24px] leading-[32px] font-semibold text-[#355933]">{title}</h1>
    )
}

export default TitleDetail