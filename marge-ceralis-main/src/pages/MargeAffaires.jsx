// src/pages/MargeAffaires/MargeAffaires.jsx
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
import AnalysisModal from '../components/Modal/AnalysisModal/AnalysisModal';
import { 
  fetchAffaires, 
  updateFilter, 
  resetFilters 
} from '../features/Analysis/analysisSlice';

const MargeAffaires = () => {
  const dispatch = useDispatch();
  const { affaires, filters, loading } = useSelector(state => state.analysis);
  const [selectedAffaire, setSelectedAffaire] = useState(null);
  const [analysisModalVisible, setAnalysisModalVisible] = useState(false);
  const [globalFilter, setGlobalFilter] = useState('');

  useEffect(() => {
    dispatch(fetchAffaires());
  }, [dispatch]);

  const filterConfig = [
    {
      key: 'dateBornes',
      label: 'Filtre par date (bornes)',
      type: 'date',
      placeholder: 'Sélectionner une période'
    },
    {
      key: 'vendeur',
      label: 'Filtre par vendeur (multi choix)',
      type: 'multiselect',
      options: [
        { label: 'Eric TAMBY', value: 'Eric TAMBY' },
        { label: 'Marie DUPONT', value: 'Marie DUPONT' },
        { label: 'Jean MARTIN', value: 'Jean MARTIN' }
      ],
      placeholder: 'Sélectionner des vendeurs'
    },
    {
      key: 'client',
      label: 'Filtre par client',
      type: 'text',
      placeholder: 'Nom du client'
    },
    {
      key: 'libelleMission',
      label: 'Filtre par libellé de mission (full text)',
      type: 'text',
      placeholder: 'Rechercher dans les missions'
    },
    {
      key: 'tacite',
      label: 'Filtre tacite',
      type: 'dropdown',
      options: [
        { label: 'Oui', value: true },
        { label: 'Non', value: false }
      ],
      placeholder: 'Sélectionner'
    }
  ];

  const handleFilterChange = (key, value) => {
    dispatch(updateFilter({ key, value }));
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
    setGlobalFilter('');
  };

  const handleAnalyzeAffaire = (rowData) => {
    setSelectedAffaire(rowData);
    setAnalysisModalVisible(true);
  };

  // Templates pour les colonnes
  const dateTemplate = (rowData) => (
    <div className="text-sm">
      {new Date(rowData.dateVente).toLocaleDateString('fr-FR')}
    </div>
  );

  const taciteTemplate = (rowData) => (
    <div className="text-center">
      <Checkbox checked={rowData.tacite} disabled />
    </div>
  );

  const priceTemplate = (rowData, field) => (
    <div className="text-right font-medium">
      {new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0
      }).format(rowData[field] || 0)}
    </div>
  );

  const marginTemplate = (rowData) => {
    const marge = rowData.margeAffaire || 0;
    const color = marge < 100 ? 'bg-red-500' : 
                 marge < 200 ? 'bg-orange-500' : 
                 'bg-green-500';
    
    return (
      <div className={`${color} text-white px-2 py-1 rounded text-center font-medium`}>
        {marge}€
      </div>
    );
  };

  const marginRateTemplate = (rowData) => {
    const taux = rowData.tauxMarge || 0;
    return (
      <span className={`font-medium ${
        taux < 20 ? 'text-red-600' : 
        taux < 30 ? 'text-orange-500' : 
        'text-green-600'
      }`}>
        {taux.toFixed(1)}%
      </span>
    );
  };

  const analysisTemplate = (rowData) => (
    <div className="text-center">
      <Checkbox checked={rowData.affaireAnalysee || false} disabled />
    </div>
  );

  const actionsTemplate = (rowData) => (
    <div className="flex gap-2 justify-center">
      <Button
        icon="pi pi-search"
        className="p-button-rounded p-button-sm primaryBtn-cerfrance"
        onClick={() => handleAnalyzeAffaire(rowData)}
        tooltip="Analyser l'affaire"
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
            Interface Marge des affaires CERALIS
          </h2>
        </div>
        <div className="flex items-center gap-2">
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
                value={affaires}
                paginator
                rows={20}
                loading={loading}
                globalFilter={globalFilter}
                responsiveLayout="scroll"
                className="p-datatable-sm"
                emptyMessage="Aucune affaire trouvée"
                rowHover
              >
                <Column
                  field="dateVente"
                  header="Date de vente"
                  sortable
                  body={dateTemplate}
                  className="w-28"
                />
                <Column
                  field="vendeur"
                  header="Vendeur"
                  sortable
                  className="w-32"
                />
                <Column
                  field="numClient"
                  header="Num Client"
                  sortable
                  className="w-24"
                />
                <Column
                  field="libelleMission"
                  header="Libellé mission"
                  sortable
                  className="min-w-80"
                />
                <Column
                  field="tacite"
                  header="Tacite"
                  body={taciteTemplate}
                  className="w-16"
                />
                <Column
                  field="valeurVenteHT"
                  header="Valeur de vente H.T."
                  body={(rowData) => priceTemplate(rowData, 'valeurVenteHT')}
                  sortable
                  className="w-36"
                  bodyClassName="text-right"
                />
                <Column
                  field="prixAchatHT"
                  header="Prix d'achat H.T."
                  body={(rowData) => priceTemplate(rowData, 'prixAchatHT')}
                  sortable
                  className="w-36 bg-cer-yellow"
                  bodyClassName="text-right bg-cer-yellow"
                />
                <Column
                  field="margeAffaire"
                  header="Marge affaire"
                  body={marginTemplate}
                  sortable
                  className="w-28"
                />
                <Column
                  field="tauxMarge"
                  header="Taux de marge"
                  body={marginRateTemplate}
                  sortable
                  className="w-28"
                  bodyClassName="text-center"
                />
                <Column
                  field="affaireAnalysee"
                  header="Affaire analysée"
                  body={analysisTemplate}
                  className="w-32"
                />
                <Column
                  header="Actions"
                  body={actionsTemplate}
                  className="w-24"
                />
              </DataTable>
            </div>
          </div>
        </div>

        <AnalysisModal
          visible={analysisModalVisible}
          onHide={() => setAnalysisModalVisible(false)}
          affaireData={selectedAffaire}
        />

        <Footer />
      </>
    </PrimeReactProvider>
  );
};

export default MargeAffaires;