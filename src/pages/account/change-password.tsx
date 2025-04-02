import { ChangePasswordForm, LoginForm } from 'components/account'
import { HeaderSub } from 'components/header-sub'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Page } from 'zmp-ui'

const ChangePasswordPage: React.FC = () => {
  const { t: tAccount } = useTranslation('account')

  return (
    <Page className="relative flex-1 flex flex-col bg-white login-page">
      <Box>
        <HeaderSub title={tAccount('change-pw')} />
        <Box>
          <img
            className="h-[260px] w-full object-cover"
            style={{
              clipPath: 'ellipse(120% 100% at 60% 0%)',
            }}
            src={
              'https://cellphones.com.vn/sforum/wp-content/uploads/2024/03/dia-diem-du-lich-long-an-1.jpg'
            }
            alt="Đổi mật khẩu"
          />
        </Box>
        <Box p={4} mt={4}>
          <Box>
            <h3 className="text-[24px] font-bold text-[#355933] text-center">
              {tAccount('wellcome-back')}
            </h3>
            <h4 className="text-[16px] font-normal text-[#8f8f8f] text-center mt-3">
              {tAccount('change-pw-desc')}
            </h4>
          </Box>
          <Box py={4}>
            <ChangePasswordForm />
          </Box>
        </Box>
      </Box>
    </Page>
  )
}

export default ChangePasswordPage
