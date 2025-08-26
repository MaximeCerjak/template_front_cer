// src/features/Analysis/analysisAPI.js
import wretch from 'wretch';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const api = wretch(API_BASE).accept('application/json');

export const analysisAPI = {
  // Récupérer toutes les affaires avec filtres
  getAffaires: (filters = {}) => {
    let query = api.url('/api/affaires');
    
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