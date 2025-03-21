import { ProfileForm } from "components/account"
import { HeaderSub } from "components/header-sub"
import React from "react"
import { useTranslation } from "react-i18next"
import { Box, Page } from "zmp-ui"

const ProfileAccountPage: React.FC = () => {

    const { t: tAccount } = useTranslation("account");

    return (
        <Page className="relative flex-1 flex flex-col bg-white pb-[72px]">
            <Box>
                <HeaderSub title={tAccount("information")} />
                <Box>
                    <ProfileForm />
                </Box>
            </Box>
        </Page>
    )
}

export default ProfileAccountPage