import { Icon } from "@iconify/react";
import React from "react";
import classNames from "classnames";

interface ActionButtonProps {
  icon: string;
  altText: string;
  isChecked?: boolean;
  onClick?: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon, altText, isChecked = false, onClick }) => {
  return (
    <div
      className={classNames(
        "p-[6px] rounded-full transition-colors",
        isChecked ? "text-[#355933] bg-gray-200" : "text-gray-500 bg-transparent"
      )}
      onClick={onClick}
    >
      <Icon icon={icon} width={18} height={18} />
    </div>
  );
};

export default ActionButton;
