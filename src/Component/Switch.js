import React from "react";
import PropTypes from "prop-types";

const Switch = ({ isEnabled, onToggle }) => {
  return (
    <div>
      <div
        onClick={onToggle}
        className={`grid grid-cols-2 w-10 h-4 text-center content-center rounded-full my-2 relative cursor-pointer ${
          isEnabled ? "bg-blue-300" : "bg-gray-300"
        }`}>
        <button
          type="button"
          className={`py-2 focus:outline-none rounded-full bg-blue-500 shadow-md text-white absolute top-1/2 transform -translate-y-1/2 h-6 w-6 transition duration-300 ease-in-out ${
            isEnabled ? "right-0" : "left-0"
          }`}></button>
      </div>
    </div>
  );
};

Switch.propTypes = {
  isEnabled: PropTypes.bool,
  onToggle: PropTypes.func.isRequired
};

export default Switch;
