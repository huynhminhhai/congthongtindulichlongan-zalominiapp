import React from "react";
import CommentForm from "./CommentForm";
import { Box } from "zmp-ui";
import CommentList from "./CommentList";
import { useTranslation } from "react-i18next";

type CommentSectionProps = {
  itemId: number
}

const CommentSection: React.FC<CommentSectionProps> = ({itemId}) => {

  const { t: tPage } = useTranslation("page");

  return (
    <div className="comment">
      <div className="detail-form">
        <h3 className="text-[18px] font-semibold text-[#355933] mb-2">{tPage("comment-title")}</h3>
        <CommentForm itemId={itemId} />
      </div>
      <Box mt={8}>
        <CommentList itemId={itemId} />
      </Box>
    </div>
  );
};

export default CommentSection;
