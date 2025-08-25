const Input = ({label, value, type, name, id, placeholder, required, onChange}) => {
    return (
      <div className="w-64">
        <label htmlFor={id} className="block text-left text-base font-medium text-gray-700">
          {label}
        </label>
        <div className="mt-1">
          <input
            value={value}
            type={type}
            name={name}
            id={id}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
            placeholder={placeholder}
            required={required}
            onChange={onChange}
          />
        </div>
      </div>
    )
  }
  
export default Input