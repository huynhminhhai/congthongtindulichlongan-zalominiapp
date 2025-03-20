import React from 'react'
import { useTranslation } from 'react-i18next';
import { Box, Input, useNavigate } from 'zmp-ui'

const SearchSection = () => {

    const { t } = useTranslation("home");
    const navigate = useNavigate()

    return (
        <Box px={4} pt={4} className='bg-white transform -translate-y-4 rounded-t-lg' >
            <Input.Search
                onClick={() => navigate('/search')}
                placeholder={t("searchPlaceholder")}
            />
        </Box>
    )
}

export default SearchSection