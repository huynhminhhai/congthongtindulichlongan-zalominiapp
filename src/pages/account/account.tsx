import { Icon } from '@iconify/react';
import { Flex } from 'antd';
import { useLogout } from 'apiRequest/auth';
import images from 'assets/images';
import { HeaderSub } from 'components/header-sub';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLoginWithZalo } from 'services/loginWithZalo';
import { getDataFromStorage, openPermissionSettingApp } from 'services/zalo';
import { useStoreApp } from 'store/store';
import { Avatar, Box, List, Page, useNavigate } from 'zmp-ui';

import styles from './index.module.scss';

const AccountPage: React.FC = () => {
  const { Item } = List;

  const navigate = useNavigate();
  const { loginWithZalo } = useLoginWithZalo();
  const { account, currentLanguage } = useStoreApp();
  const t = currentLanguage.value;
  const logout = useLogout();

  return (
    <Page className={styles.accountPage}>
      <Box>
        <HeaderSub title={t['Account']} onBackClick={() => navigate('/')} />
        <Box>
          {account ? (
            <>
              <Box m={4}>
                <Flex justify="center" align="center" vertical className="mb-[20px]">
                  <Avatar className={styles.userAvatar} size={120} src={account.avatar} />
                  <p className={styles.userName}>{account.fullName}</p>
                </Flex>

                <List className="bg-white rounded-lg">
                  <Item
                    onClick={() => navigate('/profile-account')}
                    title={t['Information']}
                    prefix={<img src={images.resume} width={30} />}
                    suffix={<Icon fontSize={20} icon="formkit:right" />}
                  />
                  <Item
                    onClick={() => navigate('/change-password')}
                    title={t['ChangePw']}
                    prefix={<img src={images.changePw} width={30} />}
                    suffix={<Icon fontSize={20} icon="formkit:right" />}
                  />
                  <Item
                    onClick={logout}
                    title={t['Logout']}
                    prefix={<img src={images.logout} width={30} />}
                    suffix={<Icon fontSize={20} icon="formkit:right" />}
                  />
                </List>
              </Box>
            </>
          ) : (
            <Box>
              <Box m={4}>
                <List className="bg-white rounded-lg">
                  <Item
                    onClick={() => loginWithZalo()}
                    title={t['LoginZalo']}
                    prefix={<img src={images.zalo} width={30} />}
                    suffix={<Icon fontSize={20} icon="formkit:right" />}
                  />
                  <Item
                    onClick={() => navigate('/login')}
                    title={t['LoginAccount']}
                    prefix={<img src={images.login} width={30} />}
                    suffix={<Icon fontSize={20} icon="formkit:right" />}
                  />

                  <Item
                    onClick={() => navigate('/register')}
                    title={t['Register']}
                    prefix={<img src={images.signup} width={30} />}
                    suffix={<Icon fontSize={20} icon="formkit:right" />}
                  />
                </List>
              </Box>
            </Box>
          )}

          <Box m={4}>
            <List className="bg-white rounded-lg">
              <Item
                onClick={() => navigate('/languages')}
                title={t['Languages']}
                prefix={<img src={images.languages} width={30} />}
                suffix={<Icon fontSize={20} icon="formkit:right" />}
              />
            </List>
          </Box>
        </Box>
      </Box>
    </Page>
  );
};

export default AccountPage;
