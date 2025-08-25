import { useEffect, useState } from "react";

const DropDown = ({
  title,
  elements,
  disabled = false,
  placeholder,
  value,
  onChange,
}) => {
  const [selected, setSelected] = useState(value || null);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  return (
    <div className="w-60 p-1 text-center">
      <label className="block text-left text-base font-medium text-gray-700">{title}</label>
      <select
        disabled={disabled}
        value={selected}
        onChange={(e) => {
          const value = e.target.value;
          setSelected(value);
          if (onChange) {
            onChange(value);
          }
        }}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md"
      >
        <option value="" disabled>
          {placeholder || title}
        </option>
        {elements.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;