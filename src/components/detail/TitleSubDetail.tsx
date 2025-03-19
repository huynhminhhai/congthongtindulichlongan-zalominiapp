import React from 'react'

const TitleSubDetail:React.FC<{title: string}> = ({title}) => {
    return (
        <h3 className="text-[22px] font-semibold text-[#355933] pb-2 mb-3 border-b-[2px] border-[#355933]">
            {title}
        </h3>
    )
}

export default TitleSubDetail