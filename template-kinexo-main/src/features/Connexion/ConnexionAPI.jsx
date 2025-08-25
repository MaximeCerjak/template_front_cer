import { cerApi } from '../../api';

export const getConnexion = () => {
	const response = cerApi.url('connect/casfull').get().json();
	return response;
};
// pour se connecter avec le token récupéré par la fonction ci-dessus, il faut utiliser la syntaxe ci-dessouspour les appels api
// cerApi.auth(`Bearer ${localStorage.getItem('token')}`).url('url').get()....
