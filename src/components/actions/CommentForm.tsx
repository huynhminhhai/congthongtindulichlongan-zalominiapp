import { yupResolver } from '@hookform/resolvers/yup';
import { useAddComment } from 'apiRequest/comments';
import { FormInputAreaField, FormInputField } from 'components/form';
import { ConfirmModal } from 'components/modal';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useStoreApp } from 'store/store';
import { useCustomSnackbar } from 'utils/useCustomSnackbar';
import { Box, Button, useSnackbar } from 'zmp-ui';

import { FormDataComments, schemaComments } from './type';

const defaultValues: FormDataComments = {
  name: '',
  content: '',
};

type CommentFormProps = {
  postId: number;
};

const CommentForm: React.FC<CommentFormProps> = ({ postId }) => {
  const { account, currentLanguage } = useStoreApp();
  const { showSuccess, showError } = useCustomSnackbar();
  const [isConfirmVisible, setConfirmVisible] = useState(false);
  const [formData, setFormData] = useState<FormDataComments>(defaultValues);

  const { mutate: addComment, isPending } = useAddComment();
  const t = currentLanguage.value;
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormDataComments>({
    resolver: yupResolver(schemaComments),
    defaultValues,
  });

  const onSubmit: SubmitHandler<FormDataComments> = data => {
    setConfirmVisible(true);
    setFormData(data);
  };

  const handleConfirm = async () => {
    setConfirmVisible(false);
    try {
      await addComment({ ...formData, postId: postId });
      showSuccess(t['AddCommentSuccess']);
      reset(defaultValues);
    } catch (error) {
      showError('Gửi bình luận thất bại');
      console.error('Error:', error);
    }
  };

  const handleCancel = () => {
    setConfirmVisible(false);
  };

  return (
    <Box>
      <Box className="comment-form">
        <div className="grid grid-cols-12 gap-x-3">
          {!account && (
            <div className="col-span-12">
              <FormInputField
                name="name"
                label={t['NamePlaceholder']}
                placeholder={`${t['NamePlaceholder']} (*)`}
                control={control}
                error={errors.name?.message}
                required
              />
            </div>
          )}

          <div className="col-span-12">
            <FormInputAreaField
              name="content"
              label={t['CommentContent']}
              placeholder={`${t['EnterContent']} (*)`}
              control={control}
              error={errors.content?.message}
              required
            />
          </div>
          <p className=" col-span-12 text-[13px] italic text-red-500 mb-2">* {t['CommentApprovalNotice']}</p>
          <div className="col-span-12">
            <Box mt={3}>
              <Button variant="primary" size={'small'} onClick={handleSubmit(onSubmit)} disabled={isPending}>
                {isPending ? `${t['Processing']}` : `${t['Comment']}`}
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
  );
};

export default CommentForm;
