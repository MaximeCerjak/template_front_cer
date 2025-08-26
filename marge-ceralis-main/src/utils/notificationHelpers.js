// src/utils/notificationHelpers.js
export const notificationHelpers = {
  // Afficher une notification de succès
  showSuccess: (message, duration = 3000) => {
    // Implémentation avec react-toastify ou primereact Toast
    if (window.toast) {
      window.toast.show({
        severity: 'success',
        summary: 'Succès',
        detail: message,
        life: duration
      });
    } else {
      console.log('SUCCESS:', message);
    }
  },

  // Afficher une notification d'erreur
  showError: (message, duration = 5000) => {
    if (window.toast) {
      window.toast.show({
        severity: 'error',
        summary: 'Erreur',
        detail: message,
        life: duration
      });
    } else {
      console.error('ERROR:', message);
    }
  },

  // Afficher une notification d'avertissement
  showWarning: (message, duration = 4000) => {
    if (window.toast) {
      window.toast.show({
        severity: 'warn',
        summary: 'Attention',
        detail: message,
        life: duration
      });
    } else {
      console.warn('WARNING:', message);
    }
  },

  // Afficher une notification d'information
  showInfo: (message, duration = 3000) => {
    if (window.toast) {
      window.toast.show({
        severity: 'info',
        summary: 'Information',
        detail: message,
        life: duration
      });
    } else {
      console.info('INFO:', message);
    }
  }
};