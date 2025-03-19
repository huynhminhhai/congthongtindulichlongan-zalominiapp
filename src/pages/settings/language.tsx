import { Icon } from "@iconify/react";
import images from "assets/images";
import { HeaderSub } from "components/header-sub"
import React from "react"
import { useLoginWithZalo } from "services/loginWithZalo";
import { openPermissionSettingApp } from "services/zalo";
import { useStoreApp } from "store/store";
import { Avatar, Box, List, Page, useNavigate, useSnackbar } from "zmp-ui"

const LanguagePage: React.FC = () => {

    const { Item } = List;
    const navigate = useNavigate()

    const { setIsLoadingFullScreen } = useStoreApp();

    return (
        <Page className="relative flex-1 flex flex-col bg-white pb-[66px]" style={{ backgroundColor: '#f5f6f7' }}>
            <Box>
                <HeaderSub title="Ngôn ngữ" />
                <Box p={4}>
                    <div className="grid grid-cols-2 gap-x-3 gap-y-4">
                        <Box p={4} flex flexDirection="column" alignItems="center" className="bg-[#fff] border-[2px] border-[#355955] rounded-lg">
                            <Avatar src={images.vietnam} />
                            <div className="text-[16px] font-semibold mt-1">Vietnamese</div>
                        </Box>
                        <Box p={4} flex flexDirection="column" alignItems="center" className="border-[2px] rounded-lg">
                            <Avatar src={images.english} />
                            <div className="text-[16px] font-semibold mt-1">English</div>
                        </Box>
                    </div>
                </Box>
            </Box>
        </Page>
    )
}

export default LanguagePage