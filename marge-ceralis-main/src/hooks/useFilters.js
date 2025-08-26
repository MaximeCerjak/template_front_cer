// src/hooks/useFilters.js
import { useState, useCallback, useEffect } from 'react';
import { storageHelpers } from '../utils/storageHelpers';

export const useFilters = (pageKey, initialFilters = {}) => {
  const [filters, setFilters] = useState(() => {
    // Charger les filtres sauvegardés ou utiliser les valeurs initiales
    const savedFilters = storageHelpers.loadUserFilters(pageKey);
    return savedFilters || initialFilters;
  });

  // Sauvegarder les filtres quand ils changent
  useEffect(() => {
    storageHelpers.saveUserFilters(pageKey, filters);
  }, [filters, pageKey]);

  const updateFilter = useCallback((key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  const hasActiveFilters = useCallback(() => {
    return Object.values(filters).some(value => {
      if (Array.isArray(value)) return value.length > 0;
      if (value instanceof Date) return true;
      return value && value !== '';
    });
  }, [filters]);

  return {
    filters,
    updateFilter,
    resetFilters,
    hasActiveFilters
  };
};