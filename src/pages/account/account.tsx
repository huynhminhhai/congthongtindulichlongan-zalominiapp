import { Icon } from '@iconify/react'
import { useLogout } from 'apiRequest/auth'
import images from 'assets/images'
import { HeaderSub } from 'components/header-sub'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useLoginWithZalo } from 'services/loginWithZalo'
import { openPermissionSettingApp } from 'services/zalo'
import { useStoreApp } from 'store/store'
import { Box, List, Page, useNavigate } from 'zmp-ui'

const AccountPage: React.FC = () => {
  const { Item } = List

  const navigate = useNavigate()
  const { loginWithZalo } = useLoginWithZalo()
  const { account } = useStoreApp()
  const logout = useLogout()
  const { t: tCommon } = useTranslation('common')
  const { t: tAccount } = useTranslation('account')

  return (
    <Page
      className="relative flex-1 flex flex-col bg-white pb-[66px]"
      style={{ backgroundColor: '#f5f6f7' }}
    >
      <Box>
        <HeaderSub
          title={tCommon('account')}
          onBackClick={() => navigate('/')}
        />
        <Box>
          {account ? (
            <>
              <Box m={4}>
                <List className="bg-white rounded-lg">
                  <Item
                    onClick={() => navigate('/profile-account')}
                    title={tAccount('information')}
                    prefix={<img src={images.resume} width={30} />}
                    suffix={<Icon fontSize={20} icon="formkit:right" />}
                  />
                  <Item
                    onClick={() => navigate('/change-password')}
                    title={tAccount('change-pw')}
                    prefix={<img src={images.changePw} width={30} />}
                    suffix={<Icon fontSize={20} icon="formkit:right" />}
                  />
                  <Item
                    onClick={logout}
                    title={tAccount('logout')}
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
                    title={tAccount('login-zalo')}
                    prefix={<img src={images.zalo} width={30} />}
                    suffix={<Icon fontSize={20} icon="formkit:right" />}
                  />
                  <Item
                    onClick={() => navigate('/login')}
                    title={tAccount('login-account')}
                    prefix={<img src={images.login} width={30} />}
                    suffix={<Icon fontSize={20} icon="formkit:right" />}
                  />
                </List>
              </Box>
            </Box>
          )}
          <Box m={4}>
            <List className="bg-white rounded-lg">
              <Item
                onClick={() => navigate('/register')}
                title={tAccount('register')}
                prefix={<img src={images.signup} width={30} />}
                suffix={<Icon fontSize={20} icon="formkit:right" />}
              />
            </List>
          </Box>
        </Box>
      </Box>
    </Page>
  )
}

export default AccountPage
