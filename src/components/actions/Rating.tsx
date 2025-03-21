import React, { useState } from "react";
import { Box } from "zmp-ui";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";

interface RatingProps {
  averageRating: number;
  totalReviews: number; 
  ratingDistribution: { [key: number]: number }; 
  onRate?: (rating: number) => void;
}

const Rating: React.FC<RatingProps> = ({ averageRating, totalReviews, ratingDistribution, onRate }) => {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const { t: tPage } = useTranslation("page");

  const handleRating = (rating: number) => {
    setSelectedRating(rating);
    onRate?.(rating);
  };

  return (
    <Box pb={4} pt={6}>
      <h3 className="text-[18px] font-semibold text-[#355933] mb-2">{tPage("rate")}</h3>

      <div className="flex gap-1 mt-3">
        {[...Array(5)].map((_, index) => {
          const starIndex = index + 1;
          return (
            <Icon
              key={starIndex}
              icon="mdi:star"
              className={`w-8 h-8 cursor-pointer ${
                selectedRating && starIndex <= selectedRating ? "text-yellow-500" : "text-gray-300"
              }`}
              onClick={() => handleRating(starIndex)}
            />
          );
        })}
      </div>

      <Box p={4} mt={4} className="shadow-[rgba(0,0,0,0.16)_0px_1px_4px]">
        <div className="flex items-center gap-1">
            <span className="text-sm font-medium text-gray-600">
            <span className="text-yellow-500 font-semibold">{averageRating.toFixed(1)}</span> / 5 ({tPage("total")}: <span className="text-yellow-500 font-semibold">{totalReviews}</span> {tPage("rate-number")})
            </span>
        </div>

        <div className="mt-4">
            {[5, 4, 3, 2, 1].map((star) => {
            const percentage = totalReviews > 0 ? (ratingDistribution[star] / totalReviews) * 100 : 0;
            return (
                <div key={star} className="flex items-center mb-1">
                <div className="text-sm font-medium w-[45px]">{star} {tPage("star")}</div>
                <div className="flex-1 w-full h-3 bg-gray-200 rounded ml-2 overflow-hidden">
                    <div
                    className="h-3 bg-gradient-to-r from-[#f5b301] to-[#ff66009e]"
                    style={{ width: `${percentage}%` }}
                    ></div>
                </div>
                <div className="text-sm text-gray-600 font-medium ml-2 w-[45px]">{percentage.toFixed(1)}%</div>
                </div>
            );
            })}
        </div>
      </Box>
      
    </Box>
  );
};

export default Rating;
