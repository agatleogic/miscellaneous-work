import React from "react";
import PropTypes from "prop-types";

const PageTitle = ({ children }) => {
  return (
    <h3 className="text-2xl font-medium text-center text-gray-700 lg:hidden mb-6">{children}</h3>
  );
};

PageTitle.propTypes = {
  children: PropTypes.node
};

export default PageTitle;
