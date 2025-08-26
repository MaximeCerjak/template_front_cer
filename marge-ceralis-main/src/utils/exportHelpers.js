// src/utils/exportHelpers.js
export const exportHelpers = {
  // Export vers Excel côté client (fallback)
  exportToExcel: async (data, filename = 'export') => {
    try {
      const XLSX = await import('xlsx');
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Data');
      XLSX.writeFile(wb, `${filename}.xlsx`);
    } catch (error) {
      console.error('Erreur export Excel:', error);
      throw new Error('Impossible d\'exporter en Excel');
    }
  },

  // Export vers CSV
  exportToCsv: (data, filename = 'export') => {
    if (!data || data.length === 0) {
      throw new Error('Aucune donnée à exporter');
    }

    const csvContent = [
      Object.keys(data[0]).join(','),
      ...data.map(row => Object.values(row).map(val => 
        typeof val === 'string' && val.includes(',') ? `"${val}"` : val
      ).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  },

  // Formatage des données pour l'export
  formatDataForExport: (data, config = {}) => {
    if (!data || data.length === 0) return [];
    
    return data.map(row => {
      const formatted = {};
      
      Object.entries(row).forEach(([key, value]) => {
        const columnConfig = config[key] || {};
        const label = columnConfig.label || key;
        
        if (columnConfig.format === 'currency' && value !== null && value !== undefined) {
          formatted[label] = new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 0
          }).format(value);
        } else if (columnConfig.format === 'percentage' && value !== null && value !== undefined) {
          formatted[label] = `${value}%`;
        } else if (columnConfig.format === 'date' && value) {
          formatted[label] = new Date(value).toLocaleDateString('fr-FR');
        } else {
          formatted[label] = value || '';
        }
      });
      
      return formatted;
    });
  },

  // Validation des données avant export
  validateExportData: (data, requiredFields = []) => {
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('Aucune donnée à exporter');
    }

    if (requiredFields.length > 0) {
      const firstRow = data[0];
      const missingFields = requiredFields.filter(field => !(field in firstRow));
      
      if (missingFields.length > 0) {
        throw new Error(`Champs manquants: ${missingFields.join(', ')}`);
      }
    }

    return true;
  },

  // Génération de nom de fichier avec timestamp
  generateFilename: (baseName = 'export', extension = 'xlsx') => {
    const now = new Date();
    const timestamp = now.toISOString().replace(/[:.]/g, '-').slice(0, -5);
    return `${baseName}_${timestamp}.${extension}`;
  }
};