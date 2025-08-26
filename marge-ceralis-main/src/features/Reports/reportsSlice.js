// src/features/Reports/reportsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { reportsAPI } from './reportsAPI';

export const fetchReportData = createAsyncThunk(
  'reports/fetchReportData',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const response = await reportsAPI.getReportData(filters);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Erreur lors du chargement du rapport');
    }
  }
);

export const exportReport = createAsyncThunk(
  'reports/exportReport',
  async ({ format, data, filename }, { rejectWithValue }) => {
    try {
      if (format === 'excel') {
        await reportsAPI.exportToExcel(data, filename);
      } else if (format === 'pdf') {
        await reportsAPI.exportToPdf(data, filename);
      }
      return { success: true };
    } catch (error) {
      return rejectWithValue(error.message || 'Erreur lors de l\'export');
    }
  }
);

const initialState = {
  reportData: [],
  filters: {
    periode: null,
    vendeur: [],
    thematique: '',
    domaine: '',
    prestation: ''
  },
  filterOptions: {
    vendeurs: [],
    thematiques: [],
    domaines: [],
    prestations: []
  },
  exportStatus: 'idle', // 'idle' | 'pending' | 'success' | 'failed'
  loading: false,
  error: null
};

const reportsSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    updateFilter: (state, action) => {
      const { key, value } = action.payload;
      state.filters[key] = value;
    },
    resetFilters: (state) => {
      state.filters = {
        periode: null,
        vendeur: [],
        thematique: '',
        domaine: '',
        prestation: ''
      };
    },
    resetExportStatus: (state) => {
      state.exportStatus = 'idle';
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch report data
      .addCase(fetchReportData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReportData.fulfilled, (state, action) => {
        state.loading = false;
        state.reportData = action.payload.data || action.payload;
        if (action.payload.filterOptions) {
          state.filterOptions = action.payload.filterOptions;
        }
      })
      .addCase(fetchReportData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Export report
      .addCase(exportReport.pending, (state) => {
        state.exportStatus = 'pending';
      })
      .addCase(exportReport.fulfilled, (state) => {
        state.exportStatus = 'success';
      })
      .addCase(exportReport.rejected, (state, action) => {
        state.exportStatus = 'failed';
        state.error = action.payload;
      });
  }
});

export const { updateFilter, resetFilters, resetExportStatus, clearError } = reportsSlice.actions;
export default reportsSlice.reducer;