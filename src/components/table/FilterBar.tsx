import React, { useState, ReactNode } from "react";
import { motion } from "framer-motion";
import { Box, Button } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";

interface FilterBarProps {
    showAddButton?: boolean;
    showFilter?: boolean;
    onFilterToggle?: () => void;
    onAddButtonClick?: () => void;
    children?: ReactNode;
    searchComponent?: ReactNode;
}

const FilterBar: React.FC<FilterBarProps> = ({
    showAddButton = true,
    showFilter = true,
    onFilterToggle,
    onAddButtonClick,
    children,
    searchComponent
}) => {
    const navigate = useNavigate();
    const [filterVisible, setFilterVisible] = useState(false);
    const { t: tCommon } = useTranslation("common");

    return (
        <div className="bg-[#fff] flex flex-col px-4 py-2 gap-2 filter-bar">
            {/* Add Button */}
            {showAddButton && (
                <Box flex justifyContent="flex-end">
                    <Button
                        fullWidth
                        size="medium"
                        variant="secondary"
                        onClick={onAddButtonClick || (() => navigate("/"))}  // Nếu có onAddButtonClick thì dùng, nếu không thì navigate mặc định
                        className="!rounded-3xl"
                    >
                        <div className="flex items-center justify-center gap-1">
                            <Icon fontSize={18} icon="material-symbols:add-rounded" />
                            {tCommon("add")}
                        </div>
                    </Button>
                </Box>
            )}

            {/* Filter & View Toggle */}

            <Box flex alignItems="center" className="gap-2">
                {searchComponent && <Box className="flex-1">{searchComponent}</Box>}
                {
                    showFilter &&
                    <Box>
                        {showFilter && (
                            <div
                                className="bg-[#355933] w-[38px] h-[38px] flex items-center justify-center border cursor-pointer rounded-lg"
                                onClick={() => {
                                    setFilterVisible(!filterVisible);
                                    onFilterToggle?.();
                                }}
                            >
                                <Icon color="#fff" icon="line-md:filter" fontSize={22} />
                            </div>
                        )}
                    </Box>
                }
            </Box>


            {/* Filter Content */}
            {showFilter && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: filterVisible ? 1 : 0, height: filterVisible ? "auto" : 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                >
                    <div className="grid grid-cols-12 gap-3 pb-2">{children}</div>
                </motion.div>
            )}
        </div>
    );
};

export default FilterBar;
