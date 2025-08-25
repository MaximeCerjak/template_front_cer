import { configureStore } from '@reduxjs/toolkit';
import connexionReducer from '../features/Connexion/ConnexionSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { thunk } from 'redux-thunk';
import { combineReducers } from 'redux';

const persistConfig = {
	key: 'root',
	storage,
};
const rootReducer = combineReducers({
	connexion: connexionReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: () => [thunk],
});

export const persistor = persistStore(store);
