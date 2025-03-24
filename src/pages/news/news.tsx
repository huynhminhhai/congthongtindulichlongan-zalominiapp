import { HeaderSub } from "components/header-sub"
import { NewsList } from "components/news"
import React from "react"
import { useTranslation } from "react-i18next"
import { Box, Page, useNavigate } from "zmp-ui"

const NewsPage: React.FC = () => {

    const navigate = useNavigate()
    const { t: tCommon } = useTranslation("common");

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title={tCommon("news")} onBackClick={() => navigate('/')} />
                <Box pb={4}>
                    <NewsList />
                </Box>
            </Box>
        </Page>
    )
}

export default NewsPage