import React from 'react'
import { useTranslation } from 'react-i18next';
import { Box, Input, useNavigate } from 'zmp-ui'

const SearchSection = () => {

    const { t } = useTranslation("home");
    const navigate = useNavigate()

    return (
        <Box px={4} pb={4}>
            <Input.Search
                onClick={() => navigate('/search')}
                placeholder={t("searchPlaceholder")}
            />
        </Box>
    )
}

export default SearchSection