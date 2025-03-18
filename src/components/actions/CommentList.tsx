import { useGetCommentsList } from 'apiRequest/comments';
import { Loading } from 'components/data';
import React from 'react'
import { Box } from 'zmp-ui'

type CommentListProps = {
    itemId: number
}

const CommentList: React.FC<CommentListProps> = ({itemId}) => {

    const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } = useGetCommentsList('postId', itemId, 3);

    return (
        <Box>
            {isLoading ? (
                <Box><Loading /></Box>
            ) : (
                <>
                    {data?.pages.map((page) =>
                        page.map((comment) => (
                            <div key={comment.id} className="flex items-start gap-3 mb-3">
                                <div className="avatar">
                                    <img className="w-[38px]" src="https://cdn-icons-png.flaticon.com/128/3608/3608172.png" alt="comment" />
                                </div>
                                <Box className='flex-1'>
                                    <Box mb={1}>
                                        <div className="text-[16px] font-semibold text-[#355933]">{comment.name}</div>
                                        <span className="text-[14px] font-medium text-[#222]">{comment.email}</span>
                                    </Box>
                                    <span className="text-[14px] font-medium text-[#222]">{comment.body}</span>
                                </Box>
                            </div>
                        ))
                    )}
                </>
            )}

            {hasNextPage && (
                <button onClick={() => fetchNextPage()} className="button button-primary" disabled={isFetchingNextPage}>
                    <span className='font-medium text-[#355933]'>{isFetchingNextPage ? "Đang tải..." : "Xem thêm bình luận"}</span>
                </button>
            )}
        </Box>
    )
}

export default CommentList