// src/features/Reports/reportsAPI.js
import wretch from 'wretch';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const api = wretch(API_BASE).accept('application/json');

export const reportsAPI = {
  // Récupérer les données pour le pilotage des marges
  getReportData: (filters = {}) => {
    let query = api.url('/api/reports/margins');
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== '' && value !== null) {
        if (Array.isArray(value) && value.length > 0) {
          query = query.query({ [key]: value.join(',') });
        } else if (value instanceof Date) {
          query = query.query({ [key]: value.toISOString().split('T')[0] });
        } else {
          query = query.query({ [key]: value });
        }
      }
    });
    
    return query.get().json();
  },

  // Export des données en Excel
  exportToExcel: (data, filename = 'export') => {
    return api
      .url('/api/reports/export/excel')
      .post({ data, filename })
      .blob()
      .then(blob => {
        // Téléchargement automatique
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${filename}.xlsx`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      });
  },

  // Export des données en PDF
  exportToPdf: (data, filename = 'export') => {
    return api
      .url('/api/reports/export/pdf')
      .post({ data, filename })
      .blob()
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${filename}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      });
  },

  // Récupérer les options pour les filtres de rapports
  getReportFilterOptions: () => {
    return api.url('/api/reports/filters').get().json();
  }
};