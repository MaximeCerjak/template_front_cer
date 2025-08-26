// src/pages/GestionPrixAchat/GestionPrixAchat.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { PrimeReactProvider } from "primereact/api";
import Tailwind from 'primereact/passthrough/tailwind';

import Header from '../components/Layout/Header/Header';
import Footer from '../components/Layout/Footer/Footer';
import FilterBar from '../components/Common/FilterBar/FilterBar';
import { 
  fetchPrestations, 
  updateFilter, 
  resetFilters,
  updatePricing 
} from '../features/Pricing/pricingSlice';

const GestionPrixAchat = () => {
  const dispatch = useDispatch();
  const { prestations, filters, loading } = useSelector(state => state.pricing);
  const [globalFilter, setGlobalFilter] = useState('');

  useEffect(() => {
    dispatch(fetchPrestations());
  }, [dispatch]);

  const filterConfig = [
    {
      key: 'codePrestation',
      label: 'Code prestation',
      type: 'text',
      placeholder: 'Filtrer par code'
    },
    {
      key: 'libellePrestation', 
      label: 'Libellé prestation',
      type: 'text',
      placeholder: 'Filtrer par libellé'
    },
    {
      key: 'domaine',
      label: 'Domaine',
      type: 'dropdown',
      options: [
        { label: 'Formation', value: 'Formation' },
        { label: 'Site internet', value: 'Site internet' },
        { label: 'Matériel caisse', value: 'Matériel caisse' }
      ],
      placeholder: 'Sélectionner un domaine'
    },
    {
      key: 'thematique',
      label: 'Thématique', 
      type: 'dropdown',
      options: [
        { label: 'Formation', value: 'Formation' },
        { label: 'Abonnement', value: 'Abonnement' },
        { label: 'Ventes', value: 'Ventes' }
      ],
      placeholder: 'Sélectionner une thématique'
    },
    {
      key: 'dateMAJ',
      label: 'Date MAJ',
      type: 'date',
      placeholder: 'Sélectionner une date'
    }
  ];

  const handleFilterChange = (key, value) => {
    dispatch(updateFilter({ key, value }));
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
    setGlobalFilter('');
  };

  const handlePriceChange = (rowData, newPrice) => {
    dispatch(updatePricing({
      codePrestation: rowData.codePrestation,
      prixAchat: newPrice
    }));
  };

  // Templates pour les colonnes
  const codeTemplate = (rowData) => (
    <div className="font-medium text-cer-blue">
      {rowData.codePrestation}
    </div>
  );

  const priceTemplate = (rowData) => (
    <div className="text-right">
      <InputText
        value={rowData.prixAchat || ''}
        onChange={(e) => handlePriceChange(rowData, e.target.value)}
        className="w-20 text-right"
        placeholder="Prix"
      />
    </div>
  );

  const marginTemplate = (rowData) => {
    if (!rowData.prixAchat || !rowData.prixVente) return '-';
    
    const marge = ((rowData.prixVente - rowData.prixAchat) / rowData.prixVente) * 100;
    return (
      <div className="text-right">
        <span className={`font-medium ${marge < 10 ? 'text-red-600' : marge < 25 ? 'text-orange-500' : 'text-green-600'}`}>
          {marge.toFixed(1)}%
        </span>
      </div>
    );
  };

  const noPriceTemplate = (rowData) => (
    <div className="text-center">
      <Checkbox
        checked={!rowData.prixAchat}
        disabled
        className="pointer-events-none"
      />
    </div>
  );

  const renderHeader = () => (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <Button
            label="Retour accueil"
            className="primaryBtn-cerfrance"
            onClick={() => window.history.back()}
          />
          <h2 className="text-xl font-bold text-cer-gray">
            Gestion des prix d'achat catalogue
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Button
            label="Filtre sans prix d'achat"
            className="primaryBtn-cerfrance"
          />
          <InputText
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Recherche globale..."
            className="w-64"
          />
        </div>
      </div>
    </div>
  );

  return (
    <PrimeReactProvider value={{ unstyled: true, pt: Tailwind }}>
      <>
        <Header />
        
        <div className="p-6 bg-gray-50 min-h-screen">
          <div className="max-w-7xl mx-auto">
            {renderHeader()}

            <FilterBar
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              filterConfig={filterConfig}
            />

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <DataTable
                value={prestations}
                paginator
                rows={20}
                loading={loading}
                globalFilter={globalFilter}
                responsiveLayout="scroll"
                className="p-datatable-sm"
                emptyMessage="Aucune prestation trouvée"
                rowHover
              >
                <Column
                  field="codePrestation"
                  header="Code prestation"
                  sortable
                  body={codeTemplate}
                  className="w-32"
                />
                <Column
                  field="libellePrestation"
                  header="Libellé prestation"
                  sortable
                  className="min-w-96"
                />
                <Column
                  field="thematique"
                  header="Thématique"
                  sortable
                  className="w-32"
                />
                <Column
                  field="domaine"
                  header="Domaine"
                  sortable
                  className="w-32"
                />
                <Column
                  field="dateMAJ"
                  header="Date MAJ"
                  sortable
                  className="w-32"
                />
                <Column
                  field="prixVente"
                  header="Prix de vente"
                  sortable
                  className="w-32 text-right"
                  bodyClassName="text-right"
                />
                <Column
                  field="prixAchat"
                  header="Prix achat"
                  body={priceTemplate}
                  className="w-28"
                />
                <Column
                  header="Tx de marge"
                  body={marginTemplate}
                  className="w-28"
                />
                <Column
                  header="Sans prix achat"
                  body={noPriceTemplate}
                  className="w-28"
                />
              </DataTable>
            </div>
          </div>
        </div>

        <Footer />
      </>
    </PrimeReactProvider>
  );
};

export default GestionPrixAchat;