// src/components/MyForm/MyForm.jsx

import React, { useState } from 'react';
import Input from '../Input/Input';
import DropDown from '../Dropdowns/DropDown';

const MyForm = ({ onSubmit }) => {
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      lastName,
      firstName,
      email,
      selectedOption,
    };
    onSubmit(formData);
  };

  return (
    <form id="myForm" onSubmit={handleSubmit}>
      <Input
        label="Nom"
        type="text"
        name="lastName"
        id="lastName"
        required={true}
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <Input
        label="Prénom"
        type="text"
        name="firstName"
        id="firstName"
        required={true}
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <Input
        label="Email"
        type="email"
        name="email"
        id="email"
        required={true}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <DropDown
        title="Choisissez une option"
        elements={[
          { key: '0', label: 'Option 0', value: '0' },
          { key: '1', label: 'Option 1', value: '1' },
          { key: '2', label: 'Option 2', value: '2' },
          { key: '3', label: 'Option 3', value: '3' },
          { key: '4', label: 'Option 4', value: '4' },
          { key: '5', label: 'Option 5', value: '5' },
        ]}
        value={selectedOption}
        onChange={(value) => setSelectedOption(value)}
      />
    </form>
  );
};

export default MyForm;

