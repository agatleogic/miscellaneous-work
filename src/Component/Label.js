import React from "react";
import PropTypes from "prop-types";

const Label = ({ htmlFor, children }) => {
  return (
    <label htmlFor={htmlFor} className="text-gray-700 font-medium">
      {children}
    </label>
  );
};

Label.propTypes = {
  htmlFor: PropTypes.string,
  children: PropTypes.string
};

export default Label;
