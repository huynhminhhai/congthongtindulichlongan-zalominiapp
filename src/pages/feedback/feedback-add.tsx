import { HeaderSub } from "components/header-sub"
import React from "react"
import { Box, Page } from "zmp-ui"
import FeedbackAddForm from "./FeedbackAddForm"
import { useTranslation } from "react-i18next"

const FeedbackAddPage: React.FC = () => {

    const { t: tCommon } = useTranslation("common");

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title={tCommon('send-feedback')} />
                <FeedbackAddForm />
            </Box>
        </Page>
    )
}

export default FeedbackAddPage