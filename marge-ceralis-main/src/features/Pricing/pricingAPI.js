// src/features/Pricing/pricingAPI.js
import wretch from 'wretch';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const api = wretch(API_BASE).accept('application/json');

export const pricingAPI = {
  // Récupérer toutes les prestations avec filtres optionnels
  getPrestations: (filters = {}) => {
    let query = api.url('/api/prestations');
    
    // Appliquer les filtres
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== '') {
        query = query.query({ [key]: value });
      }
    });
    
    return query.get().json();
  },

  // Mettre à jour le prix d'achat d'une prestation
  updatePrice: (codePrestation, prixAchat) => {
    return api
      .url(`/api/prestations/${codePrestation}/price`)
      .put({ prixAchat })
      .json();
  },

  // Récupérer les options pour les filtres (domaines, thématiques)
  getFilterOptions: () => {
    return api.url('/api/prestations/filters').get().json();
  },

  // Import/Export
  importPrestations: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    return api
      .url('/api/prestations/import')
      .formData(formData)
      .post()
      .json();
  }
};

// src/features/Analysis/analysisAPI.js
export const analysisAPI = {
  // Récupérer toutes les affaires avec filtres
  getAffaires: (filters = {}) => {
    let query = api.url('/api/affaires');
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== '' && value !== null) {
        if (Array.isArray(value) && value.length > 0) {
          query = query.query({ [key]: value.join(',') });
        } else {
          query = query.query({ [key]: value });
        }
      }
    });
    
    return query.get().json();
  },

  // Récupérer le détail d'une affaire pour analyse
  getAnalysisDetail: (numClient) => {
    return api
      .url(`/api/affaires/${numClient}/analysis`)
      .get()
      .json();
  },

  // Marquer une affaire comme analysée
  updateAnalysisStatus: (numClient, analyzed) => {
    return api
      .url(`/api/affaires/${numClient}/analysis-status`)
      .put({ analyzed })
      .json();
  },

  // Import automatique depuis Kinexo
  importFromKinexo: (filters = {}) => {
    return api
      .url('/api/affaires/import-kinexo')
      .post(filters)
      .json();
  },

  // Récupérer les vendeurs pour les filtres
  getVendeurs: () => {
    return api.url('/api/vendeurs').get().json();
  }
};

// src/features/Reports/reportsAPI.js
export const reportsAPI = {
  // Récupérer les données pour le pilotage des marges
  getReportData: (filters = {}) => {
    let query = api.url('/api/reports/margins');
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== '' && value !== null) {
        if (Array.isArray(value) && value.length > 0) {
          query = query.query({ [key]: value.join(',') });
        } else if (value instanceof Date) {
          query = query.query({ [key]: value.toISOString() });
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

// src/utils/apiHelpers.js
export const apiHelpers = {
  // Gestion centralisée des erreurs API
  handleApiError: (error) => {
    console.error('API Error:', error);
    
    if (error.status === 401) {
      // Redirection vers la page de connexion
      window.location.href = '/login';
      return 'Session expirée. Veuillez vous reconnecter.';
    }
    
    if (error.status === 403) {
      return 'Accès non autorisé.';
    }
    
    if (error.status >= 500) {
      return 'Erreur serveur. Veuillez réessayer plus tard.';
    }
    
    return error.message || 'Une erreur est survenue.';
  },

  // Configuration des headers d'authentification
  withAuth: (token) => {
    return wretch().auth(`Bearer ${token}`);
  },

  // Formatage des paramètres de filtrage
  formatFilters: (filters) => {
    const formatted = {};
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        if (Array.isArray(value)) {
          if (value.length > 0) {
            formatted[key] = value.join(',');
          }
        } else if (value instanceof Date) {
          formatted[key] = value.toISOString().split('T')[0]; // Format YYYY-MM-DD
        } else {
          formatted[key] = value;
        }
      }
    });
    
    return formatted;
  },

  // Pagination helper
  buildPaginationParams: (page = 1, limit = 20, sort = null) => {
    const params = { page, limit };
    
    if (sort) {
      params.sort = sort.field;
      params.order = sort.order || 'asc';
    }
    
    return params;
  }
};

// src/utils/exportHelpers.js
export const exportHelpers = {
  // Export vers Excel côté client (fallback)
  exportToExcel: (data, filename = 'export') => {
    // Implementation avec une bibliothèque comme xlsx ou exceljs
    import('xlsx').then(XLSX => {
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Data');
      XLSX.writeFile(wb, `${filename}.xlsx`);
    });
  },

  // Export vers CSV
  exportToCsv: (data, filename = 'export') => {
    const csvContent = [
      Object.keys(data[0]).join(','),
      ...data.map(row => Object.values(row).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  // Formatage des données pour l'export
  formatDataForExport: (data, config = {}) => {
    return data.map(row => {
      const formatted = {};
      
      Object.entries(row).forEach(([key, value]) => {
        const columnConfig = config[key] || {};
        
        if (columnConfig.format === 'currency') {
          formatted[columnConfig.label || key] = new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR'
          }).format(value);
        } else if (columnConfig.format === 'percentage') {
          formatted[columnConfig.label || key] = `${value}%`;
        } else if (columnConfig.format === 'date') {
          formatted[columnConfig.label || key] = new Date(value).toLocaleDateString('fr-FR');
        } else {
          formatted[columnConfig.label || key] = value;
        }
      });
      
      return formatted;
    });
  }
};