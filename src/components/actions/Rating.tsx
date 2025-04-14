import { Icon } from '@iconify/react';
import { useAddRating, useGetRating } from 'apiRequest/ratings';
import React, { useState } from 'react';
import { useStoreApp } from 'store/store';
import { useCustomSnackbar } from 'utils/useCustomSnackbar';
import { Box } from 'zmp-ui';

interface RatingProps {
  postId: number;
}
const Rating: React.FC<RatingProps> = ({ postId }) => {
  const { data: ratingData, refetch } = useGetRating(postId);
  const { mutateAsync: onRating } = useAddRating();
  const { showError, showSuccess } = useCustomSnackbar();
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const { currentLanguage } = useStoreApp();
  const t = currentLanguage.value;

  const handleRating = async (rating: number) => {
    try {
      await onRating?.({
        postId: postId,
        vote: rating,
      });
      await refetch();
      showSuccess(t['AddRatingSuccess']);
      setSelectedRating(rating);
    } catch (error: any) {
      showError(t['AddRatingFailure']);
    }
  };

  return (
    <Box pb={4} pt={6}>
      {ratingData && (
        <>
          <h3 className="text-[18px] font-semibold text-[#355933] mb-2">{t['RatingTitle']}</h3>
          <div className="flex gap-1 mt-3">
            {[...Array(5)].map((_, index) => {
              const starIndex = index + 1;
              return (
                <Icon
                  key={starIndex}
                  icon="mdi:star"
                  className={`w-8 h-8 cursor-pointer ${
                    selectedRating && starIndex <= selectedRating ? 'text-yellow-500' : 'text-gray-300'
                  }`}
                  onClick={() => handleRating(starIndex)}
                />
              );
            })}
          </div>
          <Box p={4} mt={4} className="shadow-[rgba(0,0,0,0.16)_0px_1px_4px]">
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium text-gray-600">
                <span className="text-yellow-500 font-semibold">{ratingData?.averageRating.toFixed(1)}</span> / 5.0 (
                {t['TotalRating']}: <span className="text-yellow-500 font-semibold">{ratingData?.totalVotes}</span>{' '}
                {t['RatingTotal']})
              </span>
            </div>

            <div className="mt-4">
              {[5, 4, 3, 2, 1].map(star => {
                const percentage =
                  ratingData?.totalVotes > 0
                    ? (ratingData.ratingDistribution[star - 1] / ratingData?.totalVotes) * 100
                    : 0;

                return (
                  <div key={star} className="flex items-center mb-1">
                    <div className="text-sm font-medium w-[45px]">
                      {star} {t['RatingStar']}
                    </div>
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
        </>
      )}
    </Box>
  );
};

export default Rating;
