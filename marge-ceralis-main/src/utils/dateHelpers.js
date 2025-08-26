// src/utils/dateHelpers.js
export const dateHelpers = {
  // Obtenir le début du mois
  getStartOfMonth: (date = new Date()) => {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  },

  // Obtenir la fin du mois
  getEndOfMonth: (date = new Date()) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
  },

  // Obtenir le début de l'année
  getStartOfYear: (date = new Date()) => {
    return new Date(date.getFullYear(), 0, 1);
  },

  // Obtenir la fin de l'année
  getEndOfYear: (date = new Date()) => {
    return new Date(date.getFullYear(), 11, 31);
  },

  // Créer une plage de dates
  createDateRange: (startDate, endDate) => {
    return {
      start: startDate,
      end: endDate
    };
  },

  // Vérifier si une date est dans une plage
  isDateInRange: (date, startDate, endDate) => {
    const checkDate = new Date(date);
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    return checkDate >= start && checkDate <= end;
  },

  // Formater pour l'API (YYYY-MM-DD)
  formatForAPI: (date) => {
    if (!date) return null;
    return new Date(date).toISOString().split('T')[0];
  },

  // Parser une date depuis l'API
  parseFromAPI: (dateString) => {
    if (!dateString) return null;
    return new Date(dateString);
  }
};