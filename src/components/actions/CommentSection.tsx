import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from 'zmp-ui';

import CommentForm from './CommentForm';
import CommentList from './CommentList';

type CommentSectionProps = {
  postId: number;
};

const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
  const { t: tPage } = useTranslation('page');

  return (
    <div className="comment">
      <div className="detail-form">
        <h3 className="text-[18px] font-semibold text-[#355933] mb-2">{tPage('comment-title')}</h3>
        <CommentForm postId={postId} />
      </div>
      <Box mt={8}>
        <CommentList postId={postId} />
      </Box>
    </div>
  );
};

export default CommentSection;
