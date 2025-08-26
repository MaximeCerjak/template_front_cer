// src/utils/validationHelpers.js
export const validationHelpers = {
  // Validation des prix
  validatePrice: (price) => {
    if (!price && price !== 0) return { valid: false, message: 'Prix requis' };
    
    const numPrice = parseFloat(price);
    if (isNaN(numPrice)) return { valid: false, message: 'Prix invalide' };
    if (numPrice < 0) return { valid: false, message: 'Prix ne peut pas être négatif' };
    
    return { valid: true };
  },

  // Validation des codes prestation
  validateCodePrestation: (code) => {
    if (!code) return { valid: false, message: 'Code requis' };
    if (code.length < 3) return { valid: false, message: 'Code trop court (min 3 caractères)' };
    if (!/^[A-Z0-9]+$/.test(code)) return { valid: false, message: 'Code invalide (lettres majuscules et chiffres uniquement)' };
    
    return { valid: true };
  },

  // Validation des filtres
  validateFilters: (filters) => {
    const errors = {};
    
    // Validation des dates
    if (filters.dateMAJ && isNaN(new Date(filters.dateMAJ))) {
      errors.dateMAJ = 'Date invalide';
    }
    
    if (filters.dateBornes) {
      if (filters.dateBornes.start && filters.dateBornes.end) {
        if (filters.dateBornes.start > filters.dateBornes.end) {
          errors.dateBornes = 'La date de début doit être antérieure à la date de fin';
        }
      }
    }
    
    return {
      valid: Object.keys(errors).length === 0,
      errors
    };
  }
};