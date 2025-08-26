// src/components/Common/LoadingSpinner/LoadingSpinner.jsx
import React from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';

const LoadingSpinner = ({ 
  size = "50px", 
  message = "Chargement...", 
  overlay = false,
  className = "" 
}) => {
  if (overlay) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-xl text-center">
          <ProgressSpinner style={{ width: size, height: size }} />
          {message && (
            <p className="mt-4 text-cer-gray font-medium">{message}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center p-8 ${className}`}>
      <ProgressSpinner style={{ width: size, height: size }} />
      {message && (
        <p className="mt-4 text-cer-gray font-medium">{message}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;