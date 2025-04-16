import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import React, { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStoreApp } from 'store/store';
import { Box, Button } from 'zmp-ui';

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
  searchComponent,
}) => {
  const navigate = useNavigate();
  const { currentLanguage } = useStoreApp();
  const t = currentLanguage.value;
  const [filterVisible, setFilterVisible] = useState(false);

  return (
    <div className="bg-[#fff] flex flex-col px-4 py-2 gap-2 filter-bar">
      {/* Add Button */}
      {showAddButton && (
        <Box flex justifyContent="flex-end">
          <Button
            fullWidth
            size="medium"
            variant="secondary"
            onClick={onAddButtonClick || (() => navigate('/'))} // Nếu có onAddButtonClick thì dùng, nếu không thì navigate mặc định
            className="!rounded-3xl"
          >
            <div className="flex items-center justify-center gap-1">
              <Icon fontSize={18} icon="material-symbols:add-rounded" />
              {t['Add']}
            </div>
          </Button>
        </Box>
      )}

      {/* Filter & View Toggle */}

      <Box flex alignItems="center" justifyContent="space-between" className="gap-2">
        {searchComponent && <Box className="flex-1">{searchComponent}</Box>}
        {showFilter && (
          <Box>
            {showFilter && (
              <div
                className="bg-[#355933] h-[46px] w-[46px] aspect-square flex items-center justify-center border cursor-pointer rounded-lg"
                onClick={() => {
                  setFilterVisible(!filterVisible);
                  onFilterToggle?.();
                }}
              >
                <Icon color="#fff" icon="line-md:filter" fontSize={22} />
              </div>
            )}
          </Box>
        )}
      </Box>

      {/* Filter Content */}
      {showFilter && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: filterVisible ? 1 : 0, height: filterVisible ? 'auto' : 0 }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <div className="grid grid-cols-12 gap-3 pb-2">{children}</div>
        </motion.div>
      )}
    </div>
  );
};

export default FilterBar;
