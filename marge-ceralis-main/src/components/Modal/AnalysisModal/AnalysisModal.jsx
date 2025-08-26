// src/components/Modal/AnalysisModal/AnalysisModal.jsx
import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnalysisData, markAsAnalyzed } from '../../../features/Analysis/analysisSlice';

const AnalysisModal = ({ 
  visible, 
  onHide, 
  affaireData 
}) => {
  const dispatch = useDispatch();
  const { currentAnalysis, loading } = useSelector(state => state.analysis);
  const [affaireAnalysee, setAffaireAnalysee] = useState(false);

  useEffect(() => {
    if (visible && affaireData) {
      dispatch(fetchAnalysisData(affaireData.numClient));
      setAffaireAnalysee(affaireData.affaireAnalysee || false);
    }
  }, [visible, affaireData, dispatch]);

  const handleMarkAsAnalyzed = () => {
    const newStatus = !affaireAnalysee;
    setAffaireAnalysee(newStatus);
    dispatch(markAsAnalyzed({
      numClient: affaireData.numClient,
      analyzed: newStatus
    }));
  };

  // Templates pour les colonnes du détail
  const marginTemplate = (rowData) => {
    const marge = rowData.marge || 0;
    const color = marge < 15 ? 'bg-red-100 text-red-800' : 
                 marge < 30 ? 'bg-orange-100 text-orange-800' : 
                 'bg-green-100 text-green-800';
    
    return (
      <Tag 
        value={`${marge}€`}
        className={`${color} font-medium`}
      />
    );
  };

  const marginRateTemplate = (rowData) => {
    const tauxMarge = rowData.tauxMarge || 0;
    return (
      <span className={`font-medium ${
        tauxMarge < 15 ? 'text-red-600' : 
        tauxMarge < 30 ? 'text-orange-500' : 
        'text-green-600'
      }`}>
        {tauxMarge}%
      </span>
    );
  };

  const priceTemplate = (rowData, field) => (
    <div className="text-right font-medium">
      {new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0
      }).format(rowData[field] || 0)}
    </div>
  );

  const footerContent = (
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <Checkbox
          checked={affaireAnalysee}
          onChange={handleMarkAsAnalyzed}
          className="mr-2"
        />
        <label className="text-sm font-medium">
          Affaire analysée
        </label>
      </div>
      <Button
        label="Fermer"
        onClick={onHide}
        className="primaryBtn-cerfrance"
      />
    </div>
  );

  if (!affaireData) return null;

  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      header={<div className="text-white">Analyse de l'affaire</div>}
      className="w-full max-w-6xl"
      modal
      footer={footerContent}
      headerClassName="bg-cer-gray text-white"
      contentClassName="p-0"
    >
      <div className="p-6">
        {/* Informations client */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-cer-blue-pastel p-3 rounded">
            <label className="text-xs font-medium text-cer-gray block mb-1">
              Num client
            </label>
            <div className="font-bold text-lg">{affaireData.numClient}</div>
          </div>
          <div className="bg-cer-blue-pastel p-3 rounded">
            <label className="text-xs font-medium text-cer-gray block mb-1">
              Désignation
            </label>
            <div className="font-medium">{affaireData.designation}</div>
          </div>
          <div className="bg-cer-blue-pastel p-3 rounded">
            <label className="text-xs font-medium text-cer-gray block mb-1">
              Date de vente
            </label>
            <div className="font-medium">{affaireData.dateVente}</div>
          </div>
          <div className="bg-cer-blue-pastel p-3 rounded">
            <label className="text-xs font-medium text-cer-gray block mb-1">
              Vendeur
            </label>
            <div className="font-medium">{affaireData.vendeur}</div>
          </div>
        </div>

        <div className="bg-cer-blue-pastel p-3 rounded mb-6">
          <label className="text-xs font-medium text-cer-gray block mb-1">
            Mission
          </label>
          <div className="font-medium">{affaireData.mission}</div>
        </div>

        {/* Tableau détaillé des prestations */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <DataTable
            value={currentAnalysis?.prestations || []}
            loading={loading}
            className="p-datatable-sm"
            responsiveLayout="scroll"
          >
            <Column
              field="codePrestation"
              header="Code prestation"
              className="w-32 font-medium"
            />
            <Column
              field="libelleMarketing"
              header="Libellé marketing"
              className="min-w-80"
            />
            <Column
              field="prixVenteUnitaire"
              header="Prix de vente unitaire"
              body={(rowData) => priceTemplate(rowData, 'prixVenteUnitaire')}
              className="w-36"
              bodyClassName="text-right"
            />
            <Column
              field="quantite"
              header="Quantité"
              className="w-20 text-center"
              bodyClassName="text-center"
            />
            <Column
              field="prixVenteTotal"
              header="Prix de vente total"
              body={(rowData) => priceTemplate(rowData, 'prixVenteTotal')}
              className="w-36"
              bodyClassName="text-right"
            />
            <Column
              field="prixAchatUnitaire"
              header="Prix d'achat unitaire"
              body={(rowData) => priceTemplate(rowData, 'prixAchatUnitaire')}
              className="w-36"
              bodyClassName="text-right bg-cer-yellow text-gray-800"
            />
            <Column
              field="marge"
              header="Marge"
              body={marginTemplate}
              className="w-24"
              bodyClassName="text-center"
            />
            <Column
              field="tauxMarge"
              header="Taux de marge"
              body={marginRateTemplate}
              className="w-28"
              bodyClassName="text-center"
            />
          </DataTable>
        </div>

        {/* Totaux */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-cer-blue-pastel p-4 rounded text-center">
            <div className="text-sm font-medium text-cer-gray mb-1">TOTAL</div>
          </div>
          <div className="bg-white p-4 rounded text-center border-2 border-cer-blue">
            <div className="text-2xl font-bold text-cer-blue">
              {currentAnalysis?.totalVente ? 
                new Intl.NumberFormat('fr-FR', {
                  style: 'currency',
                  currency: 'EUR',
                  minimumFractionDigits: 0
                }).format(currentAnalysis.totalVente) : '667€'
              }
            </div>
          </div>
          <div className="bg-cer-blue text-white p-4 rounded text-center">
            <div className="text-sm mb-1">Marge totale</div>
            <div className="text-xl font-bold">
              {currentAnalysis?.tauxMargeTotal || '31,0%'}
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default AnalysisModal;