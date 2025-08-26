// src/components/Common/BackButton/BackButton.jsx
import React from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

const BackButton = ({ 
  to = '/', 
  label = 'Retour accueil',
  className = "",
  onClick 
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(to);
    }
  };

  return (
    <Button
      label={label}
      icon="pi pi-arrow-left"
      className={`primaryBtn-cerfrance ${className}`}
      onClick={handleClick}
    />
  );
};

export default BackButton;