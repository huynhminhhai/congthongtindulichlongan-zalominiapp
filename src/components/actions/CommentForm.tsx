import React, { useState } from 'react'
import { FormDataComments, schemaComments } from './type'
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ConfirmModal } from 'components/modal';
import { Box, Button } from 'zmp-ui';
import { FormInputAreaField, FormInputField } from 'components/form';
import { useAddComment } from 'apiRequest/comments';

const defaultValues: FormDataComments = {
    name: '',
    content: '',
}

type CommentFormProps = {
    itemId: number
}

const CommentForm: React.FC<CommentFormProps> = ({ itemId }) => {

    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [formData, setFormData] = useState<FormDataComments>(defaultValues)

    const { mutate: addComment, isPending } = useAddComment();

    const { handleSubmit, reset, control, formState: { errors } } = useForm<FormDataComments>({
        resolver: yupResolver(schemaComments),
        defaultValues
    });

    const onSubmit: SubmitHandler<FormDataComments> = (data) => {
        setConfirmVisible(true);
        setFormData(data)
    };

    const handleConfirm = async () => {
        setConfirmVisible(false);
        try {
            await addComment({ ...formData, paramName: 'postId', itemId: itemId });
            reset(defaultValues);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleCancel = () => {
        setConfirmVisible(false);
    };

    return (
        <Box>
            <Box className='comment-form'>
                <div className="grid grid-cols-12 gap-x-3">
                    <div className="col-span-12">
                        <FormInputField
                            name="name"
                            label="Họ tên"
                            placeholder="Nhập họ tên (*)"
                            control={control}
                            error={errors.name?.message}
                            required
                        />
                    </div>
                    <div className="col-span-12">
                        <FormInputAreaField
                            name="content"
                            label="Nội dung bình luận"
                            placeholder="Nhập nội dung bình luận (*)"
                            control={control}
                            error={errors.content?.message}
                            required
                        />
                    </div>
                    <div className="col-span-12">
                        <Box mt={3}>
                            <Button variant="primary" size={'small'} onClick={handleSubmit(onSubmit)} disabled={isPending}>
                                {isPending ? "Đang xử lý..." : "Bình luận"}
                            </Button>
                        </Box>
                    </div>
                </div>
            </Box>
            <ConfirmModal
                visible={isConfirmVisible}
                title="Xác nhận"
                message="Bạn có chắc chắn muốn thêm bình luận không này không?"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </Box>
    )
}

export default CommentForm