import { Icon } from "@iconify/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "zmp-ui";

const FeedbackMenu: React.FC = () => {

    const navigate = useNavigate()
    const { t: tCommon } = useTranslation("common");

    return (
        <Box>
            <Box pb={4}>
                <div className="flex items-center justify-center gap-3">
                    <Button variant="primary" size="small" fullWidth onClick={() => navigate('/feedback-add')}>
                        <div className="flex items-center justify-center gap-1">
                            <Icon fontSize={16} icon='tabler:edit' />
                            <span>{tCommon('send-feedback')}</span>
                        </div>
                    </Button>
                    <Button variant="secondary" size="small" fullWidth onClick={() => navigate('/feedback-history')}>
                        <div className="flex items-center justify-center gap-1">
                            <Icon fontSize={16} icon='material-symbols:history' />
                            <span>{tCommon('feedback-sent')}</span>
                        </div>
                    </Button>
                </div>
            </Box>
        </Box>
    )
}

export default FeedbackMenu;