// src/pages/PilotageMarges/PilotageMarges.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { PrimeReactProvider } from "primereact/api";
import Tailwind from 'primereact/passthrough/tailwind';

import Header from '../components/Layout/Header/Header';
import Footer from '../components/Layout/Footer/Footer';
import FilterBar from '../components/Common/FilterBar/FilterBar';
import { 
  fetchReportData, 
  exportReport,
  updateFilter, 
  resetFilters 
} from '../features/Reports/reportsSlice';
import { exportHelpers } from '../utils/exportHelpers';

const PilotageMarges = () => {
  const dispatch = useDispatch();
  const { reportData, filters, loading, exportStatus } = useSelector(state => state.reports);

  useEffect(() => {
    dispatch(fetchReportData());
  }, [dispatch]);

  const filterConfig = [
    {
      key: 'periode',
      label: 'Période à analyser',
      type: 'date',
      placeholder: 'Sélectionner une période'
    },
    {
      key: 'vendeur',
      label: 'Filtre par vendeur (choix multi)',
      type: 'multiselect',
      options: [
        { label: 'Eric TAMBY', value: 'Eric TAMBY' },
        { label: 'Marie DUPONT', value: 'Marie DUPONT' },
        { label: 'Jean MARTIN', value: 'Jean MARTIN' }
      ],
      placeholder: 'Sélectionner des vendeurs'
    },
    {
      key: 'thematique',
      label: 'Filtre par thématique',
      type: 'dropdown',
      options: [
        { label: 'Formation', value: 'Formation' },
        { label: 'Conseil', value: 'Conseil' },
        { label: 'Audit', value: 'Audit' }
      ],
      placeholder: 'Sélectionner une thématique'
    },
    {
      key: 'domaine',
      label: 'Filtre par domaine',
      type: 'dropdown',
      options: [
        { label: 'Comptabilité', value: 'Comptabilité' },
        { label: 'Juridique', value: 'Juridique' },
        { label: 'Social', value: 'Social' }
      ],
      placeholder: 'Sélectionner un domaine'
    },
    {
      key: 'prestation',
      label: 'Filtre par prestation',
      type: 'text',
      placeholder: 'Rechercher par prestation'
    }
  ];

  const handleFilterChange = (key, value) => {
    dispatch(updateFilter({ key, value }));
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  const handleExportExcel = () => {
    const exportData = exportHelpers.formatDataForExport(reportData, {
      periode: { label: 'Période' },
      vendeur: { label: 'Vendeur' },
      thematique: { label: 'Thématique' },
      domaine: { label: 'Domaine' },
      prestations: { label: 'Prestations' },
      chiffreAffaires: { label: 'Chiffre d\'affaires', format: 'currency' },
      marges: { label: 'Marges', format: 'currency' },
      tauxMarge: { label: 'Taux de marge', format: 'percentage' }
    });

    exportHelpers.exportToExcel(exportData, 'pilotage_marges');
  };

  const renderHeader = () => (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button
            label="Retour accueil"
            className="primaryBtn-cerfrance"
            onClick={() => window.history.back()}
          />
          <h2 className="text-xl font-bold text-cer-gray">
            Pilotage des marges par vendeur
          </h2>
        </div>
        <Button
          label="Export Excel"
          className="warningBtn-cerfrance"
          onClick={handleExportExcel}
          loading={exportStatus === 'pending'}
          icon="pi pi-file-excel"
        />
      </div>
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

  const marginRateTemplate = (rowData) => (
    <div className="text-center font-medium">
      {(rowData.tauxMarge || 0).toFixed(1)}%
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
                value={reportData}
                loading={loading}
                responsiveLayout="scroll"
                className="p-datatable-sm"
                emptyMessage="Aucune donnée trouvée"
                rowHover
              >
                <Column
                  field="periode"
                  header="Période"
                  className="w-32"
                />
                <Column
                  field="vendeur"
                  header="Vendeur"
                  className="w-40"
                />
                <Column
                  field="thematique"
                  header="Thématique"
                  className="w-32"
                />
                <Column
                  field="domaine"
                  header="Domaine"
                  className="w-32"
                />
                <Column
                  field="prestations"
                  header="Prestations"
                  className="w-32"
                />
                <Column
                  field="chiffreAffaires"
                  header="Chiffre d'affaires"
                  body={(rowData) => priceTemplate(rowData, 'chiffreAffaires')}
                  className="w-36"
                  bodyClassName="text-right"
                />
                <Column
                  field="marges"
                  header="Marges"
                  body={(rowData) => priceTemplate(rowData, 'marges')}
                  className="w-32"
                  bodyClassName="text-right"
                />
                <Column
                  field="tauxMarge"
                  header="Taux de marge"
                  body={marginRateTemplate}
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

export default PilotageMarges;