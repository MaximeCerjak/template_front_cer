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
import Home from './pages/Home';

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
		<>
			<div className="justify-center p-10">
				<Routes>
					<Route index 
						element={
							<ProtectedRoute>
								<Home />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</div>
		</>
	);
}

export default App;
