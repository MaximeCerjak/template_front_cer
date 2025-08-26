// src/hooks/useExport.js
import { useState } from 'react';
import { exportHelpers } from '../utils/exportHelpers';
import { notificationHelpers } from '../utils/notificationHelpers';

export const useExport = () => {
  const [exporting, setExporting] = useState(false);

  const exportToExcel = async (data, filename = 'export', formatConfig = {}) => {
    setExporting(true);
    try {
      const formattedData = exportHelpers.formatDataForExport(data, formatConfig);
      await exportHelpers.exportToExcel(formattedData, filename);
      notificationHelpers.showSuccess('Export Excel réussi');
    } catch (error) {
      notificationHelpers.showError('Erreur lors de l\'export Excel');
      console.error('Export error:', error);
    } finally {
      setExporting(false);
    }
  };

  const exportToCsv = async (data, filename = 'export') => {
    setExporting(true);
    try {
      await exportHelpers.exportToCsv(data, filename);
      notificationHelpers.showSuccess('Export CSV réussi');
    } catch (error) {
      notificationHelpers.showError('Erreur lors de l\'export CSV');
      console.error('Export error:', error);
    } finally {
      setExporting(false);
    }
  };

  return {
    exporting,
    exportToExcel,
    exportToCsv
  };
};