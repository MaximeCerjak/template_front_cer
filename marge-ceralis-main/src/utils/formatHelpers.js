// src/utils/formatHelpers.js
export const formatHelpers = {
  // Formatage des prix
  formatPrice: (price, currency = 'EUR', locale = 'fr-FR') => {
    if (!price && price !== 0) return '-';
    
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(price);
  },

  // Formatage des pourcentages
  formatPercentage: (value, decimals = 1) => {
    if (!value && value !== 0) return '-';
    return `${value.toFixed(decimals)}%`;
  },

  // Formatage des dates
  formatDate: (date, locale = 'fr-FR', options = {}) => {
    if (!date) return '-';
    
    const defaultOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    };
    
    return new Date(date).toLocaleDateString(locale, { ...defaultOptions, ...options });
  },

  // Formatage des codes prestations
  formatCodePrestation: (code) => {
    if (!code) return '-';
    return code.toUpperCase();
  },

  // Calcul et formatage des marges
  calculateMargin: (prixVente, prixAchat) => {
    if (!prixVente || !prixAchat) return null;
    return prixVente - prixAchat;
  },

  calculateMarginRate: (prixVente, prixAchat) => {
    if (!prixVente || !prixAchat) return null;
    return ((prixVente - prixAchat) / prixVente) * 100;
  },

  // Classification des marges
  getMarginClass: (marginRate) => {
    if (!marginRate && marginRate !== 0) return 'text-gray-500';
    
    if (marginRate < 10) return 'text-red-600';
    if (marginRate < 25) return 'text-orange-500';
    return 'text-green-600';
  },

  getMarginColor: (marginRate) => {
    if (!marginRate && marginRate !== 0) return 'bg-gray-100';
    
    if (marginRate < 10) return 'bg-red-100 text-red-800';
    if (marginRate < 25) return 'bg-orange-100 text-orange-800';
    return 'bg-green-100 text-green-800';
  }
};