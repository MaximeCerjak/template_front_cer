// src/pages/Home.jsx

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FormModalContainer from '../components/Modal/FormModalContainer';
import ModalContainer from '../components/Modal/ModalContainer';
import PrimeReactTable from '../components/PrimeReactTable/PrimeReactTable';

const Home = () => {
  const modals = [
    {
      key: 'successModal',
      buttonLabel: 'Modale Succès',
      title: 'Succès',
      message: 'Opération réussie.',
      type: 'success',
      showCancel: false,
    },
    {
      key: 'notificationModal',
      buttonLabel: 'Modale Notification',
      title: 'Notification',
      message: 'Ceci est une notification.',
      type: 'default',
      showCancel: false,
    },
    {
      key: 'alertModal',
      buttonLabel: 'Modale Alerte',
      title: 'Alerte',
      message: 'Ceci est une alerte.',
      type: 'warning',
      showCancel: false,
    },
  ];

  return (
    <>
      <Header />

      <div className="justify-center p-10">
        <div className='flex items-center justify-center mb-5'>
            <button className='primaryBtn-cerfrance'>.primaryBtn-cerfrance</button>
            <button className='warningBtn-cerfrance'>.warningBtn-cerfrance</button>
            <button className='dangerBtn-cerfrance'>.dangerBtn-cerfrance</button>
        </div>
        <div className='flex items-center justify-center mb-5'>
            {/* Modales */}
            <ModalContainer modals={modals} />
            {/* Modales avec formulaire */}
            <FormModalContainer />
        </div>

        {/* Tableau PrimeReact */}
        <PrimeReactTable />
      </div>

      <Footer />
    </>
  );
};

export default Home;
