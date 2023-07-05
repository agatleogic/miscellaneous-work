import React from "react";
import PropTypes from "prop-types";

const Select = ({
  value,
  options,
  onChange,
  name,
  id,
  multiple = false,
  required = false,
  disabled = false,
  placeholder = "Select an option"
}) => {
  const handleChange = (e) => {
    if (multiple) {
      onChange(
        Array.from(e.target.parentElement.querySelectorAll("option"))
          .filter((o) => o.selected)
          .map((o) => o.value)
      );
    } else {
      onChange(e.target.value);
    }
  };
  // const determineSelected = (key) => {
  //   if (multiple) {
  //     return value.includes(key);
  //   }
  //   return value === key;
  // };
  return (
    <select
      className={`border rounded-md border-slate-300 focus:border-blue-300 focus:outline-none p-2 w-full bg-white ${
        multiple ? "h-auto" : "h-11"
      }`}
      multiple={multiple}
      name={name}
      id={id}
      value={value}
      required={required}
      disabled={disabled}
      onChange={(e) => handleChange(e)}>
      {multiple ? "" : <option value="">{placeholder}</option>}
      {options.map(([key, value]) => (
        <option key={key} value={key}>
          {value}
        </option>
      ))}
    </select>
  );
};

Select.propTypes = {
  multiple: PropTypes.bool,
  name: PropTypes.string,
  value: PropTypes.any,
  id: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  options: PropTypes.array,
  placeholder: PropTypes.string
};

export default Select;
