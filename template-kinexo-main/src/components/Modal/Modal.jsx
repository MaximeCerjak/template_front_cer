import React from 'react';
// import typeStyles from './typeStyles.js';

const Modal = ({
  isOpen,
  onClose,
  title,
  message,
  type = 'default',
  confirmLabel = 'Confirmer',
  cancelLabel = 'Annuler',
  onConfirm,
  showCancel = true,
}) => {
  
    if (!isOpen) return null;

    const typeStyles = {
        default: {
          header: 'bg-blue-100',
          iconColor: 'text-blue-600',
          button: 'bg-blue-600 hover:bg-blue-700',
          icon: (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {/* Icône d'information */}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M12 12h.01M12 8h.01M12 16h.01M12 20h.01M12 12h.01M12 8h.01"
              />
            </svg>
          ),
        },
        error: {
          header: 'bg-red-100',
          iconColor: 'text-red-600',
          button: 'bg-red-600 hover:bg-red-700',
          icon: (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {/* Icône d'erreur */}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18.364 5.636l-12.728 12.728m0-12.728l12.728 12.728"
              />
            </svg>
          ),
        },
        warning: {
          header: 'bg-yellow-100',
          iconColor: 'text-yellow-600',
          button: 'bg-yellow-600 hover:bg-yellow-700',
          icon: (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {/* Icône d'avertissement */}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M12 12h.01M12 8h.01M12 16h.01M12 20h.01M12 12h.01M12 8h.01"
              />
            </svg>
          ),
        },
        success: {
          header: 'bg-green-100',
          iconColor: 'text-green-600',
          button: 'bg-green-600 hover:bg-green-700',
          icon: (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {/* Icône de succès */}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          ),
        },
    }; 

    const currentType = typeStyles[type] || typeStyles.default;   

    return (
        <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        role="dialog"
        aria-modal="true"
        >
        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
            <div className={`px-4 py-3 ${currentType.header}`}>
            <div className="flex items-center">
                <div className={`mx-2 ${currentType.iconColor}`}>
                {currentType.icon}
                </div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                {title}
                </h3>
            </div>
            </div>
            <div className="px-4 py-5">
            <p className="text-gray-700">{message}</p>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right">
            {showCancel && (
                <button
                onClick={onClose}
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 mr-2"
                >
                {cancelLabel}
                </button>
            )}
            {onConfirm && (
                <button
                onClick={onConfirm}
                className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${currentType.button}`}
                >
                {confirmLabel}
                </button>
            )}
            </div>
        </div>
        </div>
    );
};

export default Modal;
