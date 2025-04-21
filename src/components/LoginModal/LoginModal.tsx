// components/LoginModal.tsx
import { Icon } from '@iconify/react';
import { Flex } from 'antd';
import images from 'assets/images';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginWithZalo } from 'services/loginWithZalo';
import { useStoreApp } from 'store/store';
import { List, Modal } from 'zmp-ui';

import styles from './LoginModal.module.scss';

const LoginModal: React.FC = () => {
  const { Item } = List;
  const { loginWithZalo } = useLoginWithZalo();
  const navigate = useNavigate();
  const { currentLanguage, isLoginModalOpen, setIsLoginModalOpen } = useStoreApp();
  const t = currentLanguage.value;
  return (
    <Modal
      zIndex={20000}
      className={styles.loginModal}
      visible={isLoginModalOpen}
      title={t['LoginRequired']}
      onClose={() => setIsLoginModalOpen(false)}
      actions={[
        {
          text: t['Close'],
          highLight: false,
          close: true,
        },
      ]}
    >
      <Flex justify="center" vertical gap={2}>
        <Item
          onClick={async () => {
            await loginWithZalo();
            setIsLoginModalOpen(false);
          }}
          title={t['LoginZalo']}
          prefix={<img src={images.zalo} width={30} />}
          suffix={<Icon fontSize={20} icon="formkit:right" />}
        />
        <Item
          onClick={() => {
            setIsLoginModalOpen(false);
            navigate('/login');
          }}
          title={t['LoginAccount']}
          prefix={<img src={images.login} width={30} />}
          suffix={<Icon fontSize={20} icon="formkit:right" />}
        />
      </Flex>
    </Modal>
  );
};

export default LoginModal;
