import React from "react";
import PropTypes from "prop-types";

const PrimaryButton = ({ onClick, type, children, disabled }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className="bg-blue-800 px-6 h-10 rounded-md text-white hover:bg-blue-900 disabled:bg-opacity-25 whitespace-nowrap">
      {children}
    </button>
  );
};

PrimaryButton.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  disabled: PropTypes.bool
};

export default PrimaryButton;
