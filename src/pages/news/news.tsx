import { HeaderSub } from "components/header-sub"
import { NewsList } from "components/news"
import FilterBar from "components/table/FilterBar"
import React from "react"
import { useTranslation } from "react-i18next"
import { Box, Input, Page, Select, useNavigate } from "zmp-ui"

const NewsPage: React.FC = () => {

    const navigate = useNavigate()
    const { Option } = Select
    const { t: tCommon } = useTranslation("common");

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title={tCommon("news")} onBackClick={() => navigate('/')} />
                <Box pb={4}>
                <FilterBar
                        showAddButton={false}
                    >
                        <div className="col-span-12">
                            <Input
                                placeholder={tCommon("searching")}
                                value={''}
                            />
                        </div>
                        <div className="col-span-12">
                            <Select
                                placeholder="Văn hóa"
                                closeOnSelect
                            >
                                <Option title={tCommon("all")} value={0} />
                            </Select>
                        </div>
                    </FilterBar>
                    <NewsList />
                </Box>
            </Box>
        </Page>
    )
}

export default NewsPage