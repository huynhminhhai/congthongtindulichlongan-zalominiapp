import { Pagination } from 'antd';
import { useGetCommentsList } from 'apiRequest/comments';
import { Loading } from 'components/data';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from 'zmp-ui';

type CommentListProps = {
  postId: number;
};

const CommentList: React.FC<CommentListProps> = ({ postId }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const { data, isLoading } = useGetCommentsList({
    postId,
    page: currentPage,
    size: pageSize,
  });

  const comments = data?.items || [];
  const total = data?.total || 0;

  return (
    <Box>
      {isLoading ? (
        <Box>
          <Loading />
        </Box>
      ) : (
        <>
          {comments.map(comment => (
            <div key={comment.id} className="flex items-start gap-2 mb-3">
              <div className="avatar">
                <img className="w-[38px]" src="https://cdn-icons-png.flaticon.com/128/3608/3608172.png" alt="comment" />
              </div>
              <Box className="flex-1">
                <Box mb={1}>
                  <div className="text-[16px] font-semibold text-[#355933]">{comment.name}</div>
                  <span className="text-[13px] font-medium text-[#999]">12/12/2025</span>
                </Box>
                <span className="text-[14px] font-medium text-[#999]">{comment.content}</span>
              </Box>
            </div>
          ))}

          {total > pageSize && (
            <div className="mt-4 flex justify-center">
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={total}
                onChange={page => setCurrentPage(page)}
                showSizeChanger={false}
              />
            </div>
          )}
        </>
      )}
    </Box>
  );
};

export default CommentList;
