// src/hooks/useApi.js
import { useState, useCallback } from 'react';
import { notificationHelpers } from '../utils/notificationHelpers';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (apiCall, options = {}) => {
    const { 
      showSuccessNotification = false,
      successMessage = 'Opération réussie',
      showErrorNotification = true,
      onSuccess,
      onError 
    } = options;

    setLoading(true);
    setError(null);

    try {
      const result = await apiCall();
      
      if (showSuccessNotification) {
        notificationHelpers.showSuccess(successMessage);
      }
      
      if (onSuccess) {
        onSuccess(result);
      }
      
      return result;
    } catch (err) {
      setError(err);
      
      if (showErrorNotification) {
        const errorMessage = err.response?.data?.message || err.message || 'Une erreur est survenue';
        notificationHelpers.showError(errorMessage);
      }
      
      if (onError) {
        onError(err);
      }
      
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    execute,
    clearError: () => setError(null)
  };
};