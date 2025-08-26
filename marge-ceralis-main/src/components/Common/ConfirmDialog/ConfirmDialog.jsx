// src/components/Common/ConfirmDialog/ConfirmDialog.jsx
import React from 'react';
import { ConfirmDialog as PrimeConfirmDialog } from 'primereact/confirmdialog';

const ConfirmDialog = () => {
  return (
    <PrimeConfirmDialog 
      acceptLabel="Confirmer"
      rejectLabel="Annuler"
      acceptClassName="primaryBtn-cerfrance"
      rejectClassName="warningBtn-cerfrance"
    />
  );
};

export default ConfirmDialog;