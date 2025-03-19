import { Icon } from "@iconify/react";
import images from "assets/images";
import { HeaderSub } from "components/header-sub"
import React from "react"
import { useLoginWithZalo } from "services/loginWithZalo";
import { openPermissionSettingApp } from "services/zalo";
import { useStoreApp } from "store/store";
import { Avatar, Box, List, Page, useNavigate, useSnackbar } from "zmp-ui"

const SettingsPage: React.FC = () => {

    const { Item } = List;
    const navigate = useNavigate()

    const { setIsLoadingFullScreen } = useStoreApp();

    return (
        <Page className="relative flex-1 flex flex-col bg-white pb-[66px]" style={{ backgroundColor: '#f5f6f7' }}>
            <Box>
                <HeaderSub title="Cài đặt" />
                <Box>
                    <Box m={4}>
                        <List className="bg-white rounded-lg">
                            <Item
                                onClick={() => navigate('/languages')}
                                title="Ngôn ngữ"
                                prefix={<img src={images.languages} width={30} />}
                                suffix={<Icon fontSize={20} icon="formkit:right" />}
                            />
                            <Item
                                onClick={() => openPermissionSettingApp()}
                                title="Quản lý quyền"
                                prefix={<img src={images.setting} width={30} />}
                                suffix={<Icon fontSize={20} icon="formkit:right" />}
                            />
                        </List>
                    </Box>
                </Box>
            </Box>
        </Page>
    )
}

export default SettingsPage