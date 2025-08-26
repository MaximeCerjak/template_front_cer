// src/components/Common/Toast/Toast.jsx
import React, { useRef, useEffect } from 'react';
import { Toast as PrimeToast } from 'primereact/toast';

const Toast = () => {
  const toast = useRef(null);

  useEffect(() => {
    // Rendre le toast accessible globalement
    window.toast = toast.current;
    
    return () => {
      window.toast = null;
    };
  }, []);

  return <PrimeToast ref={toast} position="top-right" />;
};

export default Toast;