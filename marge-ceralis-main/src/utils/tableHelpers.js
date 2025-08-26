// src/utils/tableHelpers.js
export const tableHelpers = {
  // Filtrage côté client
  filterData: (data, filters) => {
    return data.filter(item => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value || value === '' || (Array.isArray(value) && value.length === 0)) {
          return true;
        }

        const itemValue = item[key];
        
        if (Array.isArray(value)) {
          // Filtre multi-sélection
          return value.some(filterVal => 
            itemValue && itemValue.toString().toLowerCase().includes(filterVal.toLowerCase())
          );
        }
        
        if (value instanceof Date) {
          // Filtre date
          const itemDate = new Date(itemValue);
          return itemDate.toDateString() === value.toDateString();
        }
        
        // Filtre texte
        return itemValue && 
               itemValue.toString().toLowerCase().includes(value.toString().toLowerCase());
      });
    });
  },

  // Tri des données
  sortData: (data, sortField, sortOrder = 1) => {
    return [...data].sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      
      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;
      
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return (aVal - bVal) * sortOrder;
      }
      
      if (aVal instanceof Date && bVal instanceof Date) {
        return (aVal - bVal) * sortOrder;
      }
      
      return aVal.toString().localeCompare(bVal.toString()) * sortOrder;
    });
  },

  // Export des données de tableau
  exportTableData: (data, columns, filename = 'export') => {
    const exportData = data.map(row => {
      const exportRow = {};
      columns.forEach(col => {
        const value = row[col.field];
        exportRow[col.header] = col.exportFormat ? col.exportFormat(value) : value;
      });
      return exportRow;
    });

    return exportHelpers.exportToExcel(exportData, filename);
  },

  // Pagination
  paginateData: (data, page = 1, rows = 20) => {
    const startIndex = (page - 1) * rows;
    const endIndex = startIndex + rows;
    
    return {
      data: data.slice(startIndex, endIndex),
      totalRecords: data.length,
      page,
      rows
    };
  }
};