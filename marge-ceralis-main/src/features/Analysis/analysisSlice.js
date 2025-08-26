// src/features/Analysis/analysisSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { analysisAPI } from './analysisAPI';

// Actions asynchrones
export const fetchAffaires = createAsyncThunk(
  'analysis/fetchAffaires',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const response = await analysisAPI.getAffaires(filters);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Erreur lors du chargement des affaires');
    }
  }
);

export const fetchAnalysisData = createAsyncThunk(
  'analysis/fetchAnalysisData',
  async (numClient, { rejectWithValue }) => {
    try {
      const response = await analysisAPI.getAnalysisDetail(numClient);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Erreur lors du chargement de l\'analyse');
    }
  }
);

export const markAsAnalyzed = createAsyncThunk(
  'analysis/markAsAnalyzed',
  async ({ numClient, analyzed }, { rejectWithValue }) => {
    try {
      await analysisAPI.updateAnalysisStatus(numClient, analyzed);
      return { numClient, analyzed };
    } catch (error) {
      return rejectWithValue(error.message || 'Erreur lors de la mise à jour du statut');
    }
  }
);

export const importFromKinexo = createAsyncThunk(
  'analysis/importFromKinexo',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const response = await analysisAPI.importFromKinexo(filters);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Erreur lors de l\'import Kinexo');
    }
  }
);

const initialState = {
  affaires: [],
  currentAnalysis: null,
  vendeurs: [],
  filters: {
    dateBornes: null,
    vendeur: [],
    client: '',
    libelleMission: '',
    tacite: null
  },
  loading: false,
  analysisLoading: false,
  importStatus: 'idle',
  error: null
};

const analysisSlice = createSlice({
  name: 'analysis',
  initialState,
  reducers: {
    updateFilter: (state, action) => {
      const { key, value } = action.payload;
      state.filters[key] = value;
    },
    resetFilters: (state) => {
      state.filters = {
        dateBornes: null,
        vendeur: [],
        client: '',
        libelleMission: '',
        tacite: null
      };
    },
    clearCurrentAnalysis: (state) => {
      state.currentAnalysis = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    resetImportStatus: (state) => {
      state.importStatus = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch affaires
      .addCase(fetchAffaires.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAffaires.fulfilled, (state, action) => {
        state.loading = false;
        state.affaires = action.payload.data || action.payload;
        if (action.payload.vendeurs) {
          state.vendeurs = action.payload.vendeurs;
        }
      })
      .addCase(fetchAffaires.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch analysis data
      .addCase(fetchAnalysisData.pending, (state) => {
        state.analysisLoading = true;
      })
      .addCase(fetchAnalysisData.fulfilled, (state, action) => {
        state.analysisLoading = false;
        state.currentAnalysis = action.payload;
      })
      .addCase(fetchAnalysisData.rejected, (state, action) => {
        state.analysisLoading = false;
        state.error = action.payload;
      })
      // Mark as analyzed
      .addCase(markAsAnalyzed.fulfilled, (state, action) => {
        const { numClient, analyzed } = action.payload;
        const affaire = state.affaires.find(a => a.numClient === numClient);
        if (affaire) {
          affaire.affaireAnalysee = analyzed;
        }
        if (state.currentAnalysis && state.currentAnalysis.numClient === numClient) {
          state.currentAnalysis.affaireAnalysee = analyzed;
        }
      })
      // Import from Kinexo
      .addCase(importFromKinexo.pending, (state) => {
        state.importStatus = 'pending';
      })
      .addCase(importFromKinexo.fulfilled, (state, action) => {
        state.importStatus = 'success';
        // Rafraîchir les données après import
        if (action.payload.data) {
          state.affaires = [...state.affaires, ...action.payload.data];
        }
      })
      .addCase(importFromKinexo.rejected, (state, action) => {
        state.importStatus = 'failed';
        state.error = action.payload;
      });
  }
});

export const { 
  updateFilter, 
  resetFilters, 
  clearCurrentAnalysis, 
  clearError, 
  resetImportStatus 
} = analysisSlice.actions;

export default analysisSlice.reducer;