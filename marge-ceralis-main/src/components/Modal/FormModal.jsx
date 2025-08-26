// src/components/FormModal/FormModal.jsx

import React, { useEffect } from 'react';

const FormModal = ({
  isOpen,
  onClose,
  title,
  onSubmit,
  confirmLabel = 'Enregistrer',
  cancelLabel = 'Annuler',
  showCancel = true,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
        <div className="px-4 py-3 bg-c-b-op25">
          <div className="flex items-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {title}
            </h3>
          </div>
        </div>
        <div className="px-4 py-5">
          {children}
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right">
          {showCancel && (
            <button
              onClick={onClose}
              className="warningBtn-cerfrance"
            >
              {cancelLabel}
            </button>
          )}
          <button
            onClick={onSubmit}
            className="primaryBtn-cerfrance"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormModal;
