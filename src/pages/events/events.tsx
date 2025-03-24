import { EventsList } from "components/events"
import { HeaderSub } from "components/header-sub"
import React from "react"
import { useTranslation } from "react-i18next"
import { Box, Page, useNavigate } from "zmp-ui"

const EventsPage: React.FC = () => {

    const navigate = useNavigate()
    const { t: tCommon } = useTranslation("common");

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title={tCommon('events')} onBackClick={() => navigate('/')} />
                <Box pb={4}>
                    <EventsList />
                </Box>
            </Box>
        </Page>
    )
}

export default EventsPage