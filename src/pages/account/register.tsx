import { RegisterForm } from "components/account"
import { HeaderSub } from "components/header-sub"
import React from "react"
import { useTranslation } from "react-i18next"
import { Box, Page } from "zmp-ui"

const RegisterPage: React.FC = () => {
    
    const { t: tAccount } = useTranslation("account");

    return (
        <Page className="relative flex-1 flex flex-col bg-white login-page">
            <Box>
                <HeaderSub title={tAccount("register")} />
                <Box>
                    <img
                        className="h-[260px] w-full object-cover"
                        style={{
                            clipPath: 'ellipse(120% 100% at 60% 0%)'
                        }}
                        src={'https://vinhtour.vn/wp-content/uploads/2024/09/VT_Khu-Du-Lich-Canh-Dong-Bat-Tan-Long-An-Ve-Dep-Moc-Mac-Dam-Chat-Tay-Nam-Bo1.jpg'}
                        alt="Đăng ký"
                    />
                </Box>
                <Box p={4} mt={4}>
                    <Box>
                        <h3 className="text-[24px] font-bold text-[#355933] text-center">{tAccount("wellcome-back")}</h3>
                        <h4 className="text-[16px] font-normal text-[#8f8f8f] text-center mt-3">{tAccount("register-desc")}</h4>
                    </Box>
                    <Box py={4}>
                        <RegisterForm />
                    </Box>
                </Box>

            </Box>
        </Page>
    )
}

export default RegisterPage