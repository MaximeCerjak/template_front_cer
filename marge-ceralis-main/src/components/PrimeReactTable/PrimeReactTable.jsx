import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { PrimeReactProvider } from "primereact/api";
import Tailwind from 'primereact/passthrough/tailwind';

// CSS
import styles from './PrimeReactTable.module.scss';


const PrimeReactTable = () => {

    // Data
    const data = [
        { "NOM_PRENOM_TITULAIRE": "BARON PIERRICK", "NUM_CLIENT": "12854", "NOM_CLIENT": "SEBILEAU CAROLE", "DP_IS": "0", "LIB_COURT_REGIME_IMPOT": "BA-RSO-IR" },
        { "NOM_PRENOM_TITULAIRE": "BARON PIERRICK", "NUM_CLIENT": "4821", "NOM_CLIENT": "EARL HEGRON", "DP_IS": "0", "LIB_COURT_REGIME_IMPOT": "BA-RS-IR" },
        { "NOM_PRENOM_TITULAIRE": "BARON PIERRICK", "NUM_CLIENT": "4667", "NOM_CLIENT": "MOREAU DIDIER", "DP_IS": "0", "LIB_COURT_REGIME_IMPOT": "BA-RN-IR" },
        { "NOM_PRENOM_TITULAIRE": "BARON PIERRICK", "NUM_CLIENT": "5867", "NOM_CLIENT": "EARL MAEL", "DP_IS": "0", "LIB_COURT_REGIME_IMPOT": "BA-RN-IR" },
        { "NOM_PRENOM_TITULAIRE": "BARON PIERRICK", "NUM_CLIENT": "14321", "NOM_CLIENT": "EARL SOFADE", "DP_IS": "0", "LIB_COURT_REGIME_IMPOT": "BA-RN-IR" },
        { "NOM_PRENOM_TITULAIRE": "BARON PIERRICK", "NUM_CLIENT": "5093", "NOM_CLIENT": "EARL GIBIER DE LA CLE DES CHAMPS", "DP_IS": "0", "LIB_COURT_REGIME_IMPOT": "BA-RNO-IR" },
        { "NOM_PRENOM_TITULAIRE": "BARON PIERRICK", "NUM_CLIENT": "6672", "NOM_CLIENT": "ASLI TRINCTIERE", "DP_IS": null, "LIB_COURT_REGIME_IMPOT": "BIC-NF" },
        { "NOM_PRENOM_TITULAIRE": "BARON PIERRICK", "NUM_CLIENT": "5853", "NOM_CLIENT": "PICARD MARCEL", "DP_IS": "0", "LIB_COURT_REGIME_IMPOT": "BA-RN-IR" },
        { "NOM_PRENOM_TITULAIRE": "BARON PIERRICK", "NUM_CLIENT": "22748", "NOM_CLIENT": "MARTIN CHRISTINE", "DP_IS": "0", "LIB_COURT_REGIME_IMPOT": "BA-RS-IR" },
        { "NOM_PRENOM_TITULAIRE": "BARON PIERRICK", "NUM_CLIENT": "6470", "NOM_CLIENT": "CHEVALIER ALEXIA", "DP_IS": "0", "LIB_COURT_REGIME_IMPOT": "BA-RSO-IR" },
        { "NOM_PRENOM_TITULAIRE": "BARON PIERRICK", "NUM_CLIENT": "6912", "NOM_CLIENT": "CHAMPAIN JEAN-CLAUDE", "DP_IS": "0", "LIB_COURT_REGIME_IMPOT": "BA-RS-IR" },
        { "NOM_PRENOM_TITULAIRE": "BARON PIERRICK", "NUM_CLIENT": "7048", "NOM_CLIENT": "EARL MAINELO", "DP_IS": "0", "LIB_COURT_REGIME_IMPOT": "BA-RN-IR" }];

    // Columns
    const dynamicColumns = [
        { field: 'NOM_PRENOM_TITULAIRE', header: 'Nom et prénom'},
        { field: 'NUM_CLIENT', header: 'Numéro client'},
        { field: 'NOM_CLIENT', header: 'Nom du client'},
        { field: 'DP_IS', header: 'DP/IS'},
        { field: 'LIB_COURT_REGIME_IMPOT', header: 'Regime impot'},
    ].map(col => {
        return (
            <Column
              key={col.field}
              field={col.field}
              header={col.header}
              filter
              sortable
              pt={{
                headerCell: {
                  className: styles.headerCell,
                },
                bodyCell: {
                  className: styles.bodyCell,
                },
                filterInput: {
                  className: styles.filterInput,
                },
              }}
            />
          );
    });

    // State
    const [selectedRows, setSelectedRows] = useState([]);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);

    // Fonction pour le rendu du filtre
    const renderHeader = () => {
        return (
            <div className="table-header">
                Header
            </div>
        );
    };

    // Fonction pour la pagination
    const onCustomPage = (event) => {
        setFirst(event.first);
        setRows(event.rows);
    };

    return (
        <PrimeReactProvider value={{ unstyled: true, pt: Tailwind }}>
          <div className="p-4">
            <DataTable
              value={data}
              paginator
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
              first={first}
              rows={rows}
              onPage={onCustomPage}
              selectionMode="multiple"
              selection={selectedRows}
              onSelectionChange={(e) => setSelectedRows(e.value)}
              globalFilter={globalFilter}
              header={renderHeader()}
              responsiveLayout="scroll"
              className={styles.dataTable}
              pt={{
                table: {
                  className: styles.table,
                },
                header: {
                  className: styles.header,
                },
                paginator: {
                  className: styles.paginator,
                },
                paginatorPageButton: {
                  className: styles.paginatorPageButton,
                },
                paginatorCurrent: {
                  className: styles.paginatorCurrent,
                },
                paginatorRowsPerPageDropdown: {
                  className: styles.paginatorRowsPerPageDropdown,
                },
                row: {
                  className: styles.row,
                },
              }}
            >
              {dynamicColumns}
            </DataTable>
          </div>
        </PrimeReactProvider>
    );
};

export default PrimeReactTable;