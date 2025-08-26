// src/components/Common/DataTable/DataTable.jsx
import React, { useState } from 'react';
import { DataTable as PrimeDataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { PrimeReactProvider } from "primereact/api";
import Tailwind from 'primereact/passthrough/tailwind';
import './DataTable.scss';

const DataTable = ({
  data = [],
  columns = [],
  loading = false,
  paginator = true,
  rows = 20,
  globalFilterFields = [],
  header,
  footer,
  selection,
  onSelectionChange,
  className = "",
  emptyMessage = "Aucune donnée trouvée",
  ...props
}) => {
  const [globalFilter, setGlobalFilter] = useState('');

  const renderGlobalFilter = () => (
    <div className="flex justify-end">
      <InputText
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Recherche globale..."
        className="w-64"
        icon="pi pi-search"
      />
    </div>
  );

  const tableHeader = header || renderGlobalFilter();

  const renderColumns = () => {
    return columns.map((col, index) => (
      <Column
        key={col.field || index}
        field={col.field}
        header={col.header}
        body={col.body}
        sortable={col.sortable !== false}
        className={col.className}
        bodyClassName={col.bodyClassName}
        headerClassName={col.headerClassName}
        style={col.style}
        bodyStyle={col.bodyStyle}
        headerStyle={col.headerStyle}
      />
    ));
  };

  return (
    <PrimeReactProvider value={{ unstyled: true, pt: Tailwind }}>
      <div className={`datatable-wrapper ${className}`}>
        <PrimeDataTable
          value={data}
          loading={loading}
          paginator={paginator}
          rows={rows}
          globalFilter={globalFilter}
          globalFilterFields={globalFilterFields}
          header={tableHeader}
          footer={footer}
          selection={selection}
          onSelectionChange={onSelectionChange}
          responsiveLayout="scroll"
          className="custom-datatable"
          emptyMessage={emptyMessage}
          rowHover
          {...props}
        >
          {renderColumns()}
        </PrimeDataTable>
      </div>
    </PrimeReactProvider>
  );
};

export default DataTable;