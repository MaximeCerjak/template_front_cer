// src/features/Pricing/pricingSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { pricingAPI } from './pricingAPI';

// Actions asynchrones
export const fetchPrestations = createAsyncThunk(
  'pricing/fetchPrestations',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const response = await pricingAPI.getPrestations(filters);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Erreur lors du chargement des prestations');
    }
  }
);

export const updatePricing = createAsyncThunk(
  'pricing/updatePricing',
  async ({ codePrestation, prixAchat }, { rejectWithValue }) => {
    try {
      const response = await pricingAPI.updatePrice(codePrestation, prixAchat);
      return { codePrestation, prixAchat: response.prixAchat };
    } catch (error) {
      return rejectWithValue(error.message || 'Erreur lors de la mise à jour du prix');
    }
  }
);

export const importPrestations = createAsyncThunk(
  'pricing/importPrestations',
  async (file, { rejectWithValue }) => {
    try {
      const response = await pricingAPI.importPrestations(file);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Erreur lors de l\'import');
    }
  }
);

const initialState = {
  prestations: [],
  filters: {
    codePrestation: '',
    libellePrestation: '',
    domaine: '',
    thematique: '',
    dateMAJ: null,
    sansPrixAchat: false
  },
  filterOptions: {
    domaines: [],
    thematiques: []
  },
  loading: false,
  error: null,
  importStatus: 'idle'
};

const pricingSlice = createSlice({
  name: 'pricing',
  initialState,
  reducers: {
    updateFilter: (state, action) => {
      const { key, value } = action.payload;
      state.filters[key] = value;
    },
    resetFilters: (state) => {
      state.filters = {
        codePrestation: '',
        libellePrestation: '',
        domaine: '',
        thematique: '',
        dateMAJ: null,
        sansPrixAchat: false
      };
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
      // Fetch prestations
      .addCase(fetchPrestations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPrestations.fulfilled, (state, action) => {
        state.loading = false;
        state.prestations = action.payload.data || action.payload;
        if (action.payload.filterOptions) {
          state.filterOptions = action.payload.filterOptions;
        }
      })
      .addCase(fetchPrestations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update pricing
      .addCase(updatePricing.fulfilled, (state, action) => {
        const { codePrestation, prixAchat } = action.payload;
        const prestation = state.prestations.find(p => p.codePrestation === codePrestation);
        if (prestation) {
          prestation.prixAchat = prixAchat;
        }
      })
      .addCase(updatePricing.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Import prestations
      .addCase(importPrestations.pending, (state) => {
        state.importStatus = 'pending';
      })
      .addCase(importPrestations.fulfilled, (state, action) => {
        state.importStatus = 'success';
        // Rafraîchir les données après import
        state.prestations = action.payload.data || state.prestations;
      })
      .addCase(importPrestations.rejected, (state, action) => {
        state.importStatus = 'failed';
        state.error = action.payload;
      });
  }
});

export const { updateFilter, resetFilters, clearError, resetImportStatus } = pricingSlice.actions;
export default pricingSlice.reducer;