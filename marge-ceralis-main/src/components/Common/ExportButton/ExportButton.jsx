// src/components/Common/ExportButton/ExportButton.jsx
import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';

const ExportButton = ({ 
  data, 
  filename = 'export',
  onExport,
  loading = false,
  className = "" 
}) => {
  const menuRef = React.useRef(null);

  const menuItems = [
    {
      label: 'Export Excel',
      icon: 'pi pi-file-excel',
      command: () => onExport && onExport('excel', data, filename)
    },
    {
      label: 'Export CSV',
      icon: 'pi pi-file',
      command: () => onExport && onExport('csv', data, filename)
    },
    {
      label: 'Export PDF',
      icon: 'pi pi-file-pdf',
      command: () => onExport && onExport('pdf', data, filename)
    }
  ];

  return (
    <>
      <Button
        label="Export"
        icon="pi pi-download"
        className={`warningBtn-cerfrance ${className}`}
        onClick={(e) => menuRef.current.toggle(e)}
        loading={loading}
      />
      <Menu
        model={menuItems}
        popup
        ref={menuRef}
      />
    </>
  );
};

export default ExportButton;