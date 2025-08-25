import React, { useState } from 'react';
import FormModal from './FormModal';
import MyForm from '../Form/MyForm';

const FormModalContainer = () => {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  const handleFormSubmit = () => {
    // Soumettre le formulaire
    const form = document.getElementById('myForm');
    if (form) {
      form.requestSubmit();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Récupérer les données du formulaire et effectuer les actions nécessaires
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log('Données du formulaire :', data);
    setIsFormModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center">
      <button
        className="primaryBtn-cerfrance mb-4"
        onClick={() => setIsFormModalOpen(true)}
      >
        Modale formulaire
      </button>

      <FormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title="Formulaire"
        onSubmit={handleFormSubmit}
        confirmLabel="Enregistrer"
        cancelLabel="Annuler"
        showCancel={true}
      >
        <MyForm onSubmit={handleSubmit} />
      </FormModal>
    </div>
  );
};

export default FormModalContainer;
