// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import "primereact/resources/themes/saga-blue/theme.css";  
import "primereact/resources/primereact.min.css";           
import "primeicons/primeicons.css";                        
import ProtectedRoute from './features/ProtectedRoute';
import { useDispatch, useSelector } from 'react-redux';
import {
	getConnexionAsync,
	isLoaded,
} from './features/Connexion/ConnexionSlice';
import { forceReconnectionWhenTokenInvalid } from './functions/mainFunctions';
import { useEffect } from 'react';

// Pages
import Home from './pages/Home';
import GestionPrixAchat from './pages/GestionPrixAchat';
import MargeAffaires from './pages/MargeAffaires';
// import PilotageMarges from './pages/PilotageMarges';

function App() {
	const dispatch = useDispatch();
	const connected = useSelector(isLoaded);

	useEffect(() => {
		dispatch(getConnexionAsync());
		setInterval(() => forceReconnectionWhenTokenInvalid(dispatch), 60000);
	}, []);

	useEffect(() => {
		if (connected !== true) {
			dispatch(getConnexionAsync());
		}
	}, [connected]);

	return (
		<div className="min-h-screen bg-gray-50">
			<Routes>
				{/* Page d'accueil - Menu principal */}
				<Route 
					index 
					element={
						<ProtectedRoute>
							<Home />
						</ProtectedRoute>
					}
				/>
				
				{/* Gestion des prix d'achat catalogue */}
				<Route 
					path="/pricing" 
					element={
						<ProtectedRoute>
							<GestionPrixAchat />
						</ProtectedRoute>
					}
				/>
				
				{/* Interface Marge des affaires CERALIS */}
				<Route 
					path="/analysis" 
					element={
						<ProtectedRoute>
							<MargeAffaires />
						</ProtectedRoute>
					}
				/>
				
				{/* Pilotage des marges par vendeur */}
				{/* <Route 
					path="/reports" 
					element={
						<ProtectedRoute>
							<PilotageMarges />
						</ProtectedRoute>
					}
				/> */}
			</Routes>
		</div>
	);
}

export default App;