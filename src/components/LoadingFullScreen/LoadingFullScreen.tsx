import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

const BlurLoading = ({ isLoading }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className={classNames(
            'fixed inset-0 flex items-center justify-center bg-white/30 backdrop-blur-sm z-[5000000]'
          )}
        >
          <span className="loader"></span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BlurLoading;
