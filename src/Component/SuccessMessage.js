import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { setSuccess } from "../store/alertSlice";

const SuccessMessage = ({ children, message, onClose }) => {
  const [data, setData] = useState(null);

  const handleClose = () => {
    setData(null);
    onClose && onClose();
  };

  useEffect(() => {
    setData(children || message);
    setTimeout(() => {
      setSuccess("");
      setData("");
    }, 2500);
  }, [children, message]);

  return data ? (
    <div className="absolute top-28 right-4 flex flex-col items-end z-10">
      <div className="flex px-4 py-2 items-center space-x-4 bg-green-100 rounded border border-green-200 mb-6">
        <p className="text-green-700 font-sm">{data}</p>
        <button
          type="button"
          className="w-8 h-8 rounded text-2xl font-light bg-green-200 border-green-500"
          onClick={handleClose}>
          &times;
        </button>
      </div>
    </div>
  ) : null;
};

SuccessMessage.propTypes = {
  children: PropTypes.any,
  message: PropTypes.string,
  onClose: PropTypes.func
};

export default SuccessMessage;
