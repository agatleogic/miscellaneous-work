import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const TextInput = ({
  value,
  onChange,
  name,
  id,
  type = "text",
  placeholder,
  required,
  limit = 50,
  disabled = false
}) => {
  const [count, setCount] = useState(limit - (value?.length || 0));

  useEffect(() => {
    setCount(limit - (value?.length || 0));
  }, [value]);

  return (
    <div className="flex items-center justify-center w-full">
      <input
        className="border rounded-md border-slate-300 focus:border-blue-300 focus:outline-none p-2 w-full"
        maxLength={limit}
        type={type}
        name={name}
        placeholder={placeholder}
        id={id}
        value={value}
        required={required}
        disabled={disabled}
        onChange={(event) => {
          onChange(event.target.value);
        }}
      />
      <div className="flex items-center justify-center px-3 text-gray-600 text-xs">{count}</div>
    </div>
  );
};

TextInput.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.any,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  limit: PropTypes.number,
  onChange: PropTypes.func
};

export default TextInput;
