// src/components/ModalContainer.jsx

import React, { useState } from 'react';
import Modal from './Modal';

const ModalContainer = ({ modals }) => {
    const [openModals, setOpenModals] = useState({});

    const handleOpen = (key) => {
        setOpenModals((prev) => ({ ...prev, [key]: true }));
    };

    const handleClose = (key) => {
        setOpenModals((prev) => ({ ...prev, [key]: false }));
    };

    return (
        <div className="flex flex-col items-center">
        {/* Boutons pour ouvrir les modales */}
        <div className="flex space-x-4 mb-4">
            {modals.map((modal) => (
            <button
                key={modal.key}
                className="primaryBtn-cerfrance"
                onClick={() => handleOpen(modal.key)}
            >
                {modal.buttonLabel}
            </button>
            ))}
        </div>

        {/* Modales */}
        {modals.map((modal) => (
            <Modal
            key={modal.key}
            isOpen={openModals[modal.key] || false}
            onClose={() => handleClose(modal.key)}
            title={modal.title}
            message={modal.message}
            type={modal.type}
            confirmLabel={modal.confirmLabel || 'Fermer'}
            onConfirm={() => handleClose(modal.key)}
            showCancel={modal.showCancel || false}
            />
        ))}
        </div>
    );
};

export default ModalContainer;
