// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import connexionReducer from '../features/Connexion/ConnexionSlice';
import pricingReducer from '../features/Pricing/pricingSlice';
import analysisReducer from '../features/Analysis/analysisSlice';
import reportsReducer from '../features/Reports/reportsSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { thunk } from 'redux-thunk';
import { combineReducers } from 'redux';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['connexion', 'pricing', 'analysis']
};

const rootReducer = combineReducers({
  connexion: connexionReducer,
  pricing: pricingReducer,
  analysis: analysisReducer,
  reports: reportsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(thunk),
});

export const persistor = persistStore(store);