import React, { useState } from "react";
import PropTypes from "prop-types";

const Dropdown = ({ trigger, children, up }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <div className="flex items-center justify-center" onClick={() => setOpen(!open)}>
        {trigger}
      </div>

      {open && <div className="fixed inset-0 z-40" onClick={() => setOpen(false)}></div>}

      {open && (
        <div
          className={`absolute z-50 rounded-md shadow-lg origin-top-right right-0 w-48 ${
            up ? "bottom-8" : "top-8"
          }`}
          onClick={() => setOpen(false)}>
          <div className="rounded-md ring-1 ring-black ring-opacity-5 py-1 bg-white flex flex-col space-y-1">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  children: PropTypes.node.isRequired,
  trigger: PropTypes.node.isRequired,
  up: PropTypes.bool
};

export default Dropdown;
