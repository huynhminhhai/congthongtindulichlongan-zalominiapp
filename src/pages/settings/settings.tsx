import { Icon } from "@iconify/react";
import images from "assets/images";
import { HeaderSub } from "components/header-sub"
import React from "react"
import { useTranslation } from "react-i18next";
import { openPermissionSettingApp } from "services/zalo";
import { useStoreApp } from "store/store";
import { Box, List, Page, useNavigate } from "zmp-ui"

const SettingsPage: React.FC = () => {

    const { Item } = List;
    const navigate = useNavigate()
    const { t: tSettings } = useTranslation("setting");
    const { t: tCommon } = useTranslation("common");

    const { setIsLoadingFullScreen } = useStoreApp();

    return (
        <Page className="relative flex-1 flex flex-col bg-white pb-[66px]" style={{ backgroundColor: '#f5f6f7' }}>
            <Box>
                <HeaderSub title={tCommon("settings")} />
                <Box>
                    <Box m={4}>
                        <List className="bg-white rounded-lg">
                            <Item
                                onClick={() => navigate('/languages')}
                                title={tSettings('languages')}
                                prefix={<img src={images.languages} width={30} />}
                                suffix={<Icon fontSize={20} icon="formkit:right" />}
                            />
                            <Item
                                onClick={() => openPermissionSettingApp()}
                                title={tSettings('permissions')}
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