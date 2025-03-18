import React from "react";
import CommentForm from "./CommentForm";
import { Box } from "zmp-ui";
import CommentList from "./CommentList";

type CommentSectionProps = {
  itemId: number
}

const CommentSection: React.FC<CommentSectionProps> = ({itemId}) => {

  return (
    <div className="comment">
      <div className="detail-form">
        <h3 className="text-[18px] font-semibold text-[#355933] mb-2">Để lại bình luận</h3>
        <CommentForm itemId={itemId} />
      </div>
      <Box mt={8}>
        <CommentList itemId={itemId} />
      </Box>
    </div>
  );
};

export default CommentSection;
