// src/components/Modal/ExportModal/ExportModal.jsx
import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';

const ExportModal = ({
  visible,
  onHide,
  data = [],
  availableColumns = [],
  onExport
}) => {
  const [exportConfig, setExportConfig] = useState({
    format: 'excel',
    filename: 'export',
    selectedColumns: availableColumns.map(col => col.field),
    includeHeaders: true
  });

  const formatOptions = [
    { label: 'Excel (.xlsx)', value: 'excel' },
    { label: 'CSV (.csv)', value: 'csv' },
    { label: 'PDF (.pdf)', value: 'pdf' }
  ];

  const handleExport = () => {
    if (onExport) {
      onExport(exportConfig);
    }
    onHide();
  };

  const toggleColumn = (columnField) => {
    setExportConfig(prev => ({
      ...prev,
      selectedColumns: prev.selectedColumns.includes(columnField)
        ? prev.selectedColumns.filter(field => field !== columnField)
        : [...prev.selectedColumns, columnField]
    }));
  };

  const footerContent = (
    <div className="flex justify-end gap-2">
      <Button
        label="Annuler"
        className="warningBtn-cerfrance"
        onClick={onHide}
      />
      <Button
        label="Exporter"
        className="primaryBtn-cerfrance"
        onClick={handleExport}
        disabled={exportConfig.selectedColumns.length === 0}
      />
    </div>
  );

  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      header="Configuration de l'export"
      className="w-full max-w-md"
      modal
      footer={footerContent}
    >
      <div className="space-y-4">
        {/* Format */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Format d'export
          </label>
          <Dropdown
            value={exportConfig.format}
            onChange={(e) => setExportConfig(prev => ({ ...prev, format: e.value }))}
            options={formatOptions}
            className="w-full"
          />
        </div>

        {/* Nom de fichier */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nom du fichier
          </label>
          <InputText
            value={exportConfig.filename}
            onChange={(e) => setExportConfig(prev => ({ ...prev, filename: e.target.value }))}
            className="w-full"
            placeholder="Nom du fichier"
          />
        </div>

        {/* Colonnes à exporter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Colonnes à exporter
          </label>
          <div className="space-y-2 max-h-48 overflow-y-auto border border-gray-200 rounded p-2">
            {availableColumns.map((column) => (
              <div key={column.field} className="flex items-center">
                <Checkbox
                  checked={exportConfig.selectedColumns.includes(column.field)}
                  onChange={() => toggleColumn(column.field)}
                  className="mr-2"
                />
                <label className="text-sm">{column.header}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Options */}
        <div>
          <div className="flex items-center">
            <Checkbox
              checked={exportConfig.includeHeaders}
              onChange={(e) => setExportConfig(prev => ({ ...prev, includeHeaders: e.checked }))}
              className="mr-2"
            />
            <label className="text-sm">Inclure les en-têtes</label>
          </div>
        </div>

        {/* Informations */}
        <div className="bg-blue-50 p-3 rounded">
          <p className="text-sm text-blue-700">
            <strong>{data.length}</strong> lignes seront exportées
          </p>
        </div>
      </div>
    </Dialog>
  );
};

export default ExportModal;