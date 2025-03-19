import React from "react";
import { Box } from "zmp-ui";

interface ItemDetailCardProps {
    imgUrl: string;
    title: string;
    desc?: string;
}

const ItemDetailCard: React.FC<ItemDetailCardProps> = ({ imgUrl, title, desc }) => {

    return (
        <Box flex className='gap-3'>
            <Box>
                <img className='w-[120px] h-[80px] rounded-lg' src={imgUrl} alt={title} />
            </Box>
            <Box className="flex-1">
                <div className="text-[16px] font-semibold">{title}</div>
                <div className="text-[12px] font-medium">{desc}</div>
            </Box>
        </Box>
    );
};

export default ItemDetailCard;
