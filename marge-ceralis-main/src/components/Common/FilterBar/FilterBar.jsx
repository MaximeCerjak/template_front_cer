// src/components/Common/FilterBar/FilterBar.jsx
import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { MultiSelect } from 'primereact/multiselect';

const FilterBar = ({ 
  filters, 
  onFilterChange, 
  onResetFilters,
  filterConfig,
  className = "" 
}) => {
  const renderFilter = (config) => {
    const { key, label, type, options, placeholder } = config;
    const value = filters[key];

    switch (type) {
      case 'text':
        return (
          <div key={key} className="flex flex-col">
            <label className="text-sm font-medium text-cer-gray mb-1">
              {label}
            </label>
            <InputText
              value={value || ''}
              onChange={(e) => onFilterChange(key, e.target.value)}
              placeholder={placeholder}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cer-blue focus:border-cer-blue"
            />
          </div>
        );

      case 'dropdown':
        return (
          <div key={key} className="flex flex-col">
            <label className="text-sm font-medium text-cer-gray mb-1">
              {label}
            </label>
            <Dropdown
              value={value}
              onChange={(e) => onFilterChange(key, e.value)}
              options={options}
              placeholder={placeholder}
              className="w-full"
              showClear
            />
          </div>
        );

      case 'date':
        return (
          <div key={key} className="flex flex-col">
            <label className="text-sm font-medium text-cer-gray mb-1">
              {label}
            </label>
            <Calendar
              value={value}
              onChange={(e) => onFilterChange(key, e.value)}
              placeholder={placeholder}
              className="w-full"
              showIcon
              dateFormat="dd/mm/yy"
            />
          </div>
        );

      case 'multiselect':
        return (
          <div key={key} className="flex flex-col">
            <label className="text-sm font-medium text-cer-gray mb-1">
              {label}
            </label>
            <MultiSelect
              value={value || []}
              onChange={(e) => onFilterChange(key, e.value)}
              options={options}
              placeholder={placeholder}
              className="w-full"
              display="chip"
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
        {filterConfig.map(config => renderFilter(config))}
      </div>
      
      <div className="flex justify-end">
        <Button
          type="button"
          label="Réinitialiser"
          onClick={onResetFilters}
          className="warningBtn-cerfrance"
          icon="pi pi-refresh"
          size="small"
        />
      </div>
    </div>
  );
};

export default FilterBar;