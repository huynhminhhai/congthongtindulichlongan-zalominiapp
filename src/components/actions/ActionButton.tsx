import { Icon } from '@iconify/react';
import classNames from 'classnames';
import React from 'react';

interface ActionButtonProps {
  icon: string;
  altText: string;
  isChecked?: boolean;
  className?: string;
  onClick?: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon, altText, isChecked = false, className, onClick }) => {
  return (
    <div
      className={classNames(
        className,
        'p-[6px] rounded-full transition-colors transition-transform duration-300 ease-in-out transform hover:scale-115 active:scale-95',
        isChecked ? 'text-[#355933] bg-gray-200' : 'text-gray-500 bg-gray-200'
      )}
      onClick={onClick}
    >
      <Icon icon={icon} width={30} height={30} />
    </div>
  );
};

export default ActionButton;
