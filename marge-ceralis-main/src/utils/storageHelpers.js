// src/utils/storageHelpers.js
export const storageHelpers = {
  // Sauvegarder les filtres utilisateur
  saveUserFilters: (pageKey, filters) => {
    try {
      const key = `ceralis_filters_${pageKey}`;
      localStorage.setItem(key, JSON.stringify(filters));
    } catch (error) {
      console.warn('Impossible de sauvegarder les filtres:', error);
    }
  },

  // Charger les filtres utilisateur
  loadUserFilters: (pageKey) => {
    try {
      const key = `ceralis_filters_${pageKey}`;
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.warn('Impossible de charger les filtres:', error);
      return null;
    }
  },

  // Sauvegarder les préférences utilisateur
  saveUserPreferences: (preferences) => {
    try {
      localStorage.setItem('ceralis_preferences', JSON.stringify(preferences));
    } catch (error) {
      console.warn('Impossible de sauvegarder les préférences:', error);
    }
  },

  // Charger les préférences utilisateur
  loadUserPreferences: () => {
    try {
      const saved = localStorage.getItem('ceralis_preferences');
      return saved ? JSON.parse(saved) : {
        rowsPerPage: 20,
        exportFormat: 'xlsx',
        theme: 'light'
      };
    } catch (error) {
      console.warn('Impossible de charger les préférences:', error);
      return {};
    }
  },

  // Nettoyer le stockage
  clearStorage: () => {
    try {
      const keys = Object.keys(localStorage).filter(key => key.startsWith('ceralis_'));
      keys.forEach(key => localStorage.removeItem(key));
    } catch (error) {
      console.warn('Impossible de nettoyer le stockage:', error);
    }
  }
};