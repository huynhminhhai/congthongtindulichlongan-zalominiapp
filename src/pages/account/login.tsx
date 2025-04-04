import { LoginForm } from "components/account";
import { HeaderSub } from "components/header-sub";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getDataFromStorage } from "services/zalo";
import { useStoreApp } from "store/store";
import { Box, Page, useNavigate, useSnackbar } from "zmp-ui";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { openSnackbar } = useSnackbar();
  const { account, setAuth } = useStoreApp();
  const { t: tAccount } = useTranslation("account");

  useEffect(() => {
    const checkLogin = async () => {
      if (account) {
        openSnackbar({
          icon: true,
          text: "Bạn đã đăng nhập thành công",
          type: "success",
          action: { text: "Đóng", close: true },
          duration: 3000
        });
        navigate("/account");
        return;
      }

      const storedData = await getDataFromStorage(["account", "token"]);

      if (storedData && storedData.account && storedData.token) {
        try {
          const parsedAccount = JSON.parse(storedData.account);
          setAuth({ account: parsedAccount, token: storedData.token });
        } catch (error) {
          console.error("Lỗi parse account:", error);
        }
      }
    };

    checkLogin();
  }, [account, setAuth]);

  return (
    <Page className="relative flex-1 flex flex-col bg-white login-page">
      <Box>
        <HeaderSub title={tAccount("login")} />
        <Box>
          <img
            className="h-[260px] w-full object-cover"
            style={{
              clipPath: "ellipse(120% 100% at 30% 0%)"
            }}
            src={
              "https://ik.imagekit.io/tvlk/blog/2022/12/dia-diem-du-lich-long-an-3.jpg?tr=q-70,c-at_max,w-500,h-300,dpr-2"
            }
            alt="Đăng nhập"
          />
        </Box>
        <Box p={4} mt={6}>
          <Box>
            <h3 className="text-[24px] font-bold text-[#355933] text-center">
              {tAccount("wellcome-back")}
            </h3>
            <h4 className="text-[16px] font-normal text-[#8f8f8f] text-center mt-3">
              {tAccount("login-desc")}
            </h4>
          </Box>
          <Box py={4}>
            <LoginForm />
          </Box>
        </Box>
      </Box>
    </Page>
  );
};

export default LoginPage;
