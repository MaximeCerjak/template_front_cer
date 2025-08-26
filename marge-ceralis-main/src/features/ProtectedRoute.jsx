import { Navigate } from 'react-router-dom';
function ProtectedRoute({ children }) {
	let condition = true; // définir une condition d'accès à la route protégée
	if (!condition) {
		// si la condition n'est pas remplie, on redirige vers un écran de connexion par exemple
		return <Navigate to="/" replace />;
	}
	return children;
}
export default ProtectedRoute;
