import { getConnexionAsync } from '../features/Connexion/ConnexionSlice';

var apiSessionTime = 60 * 60 * 12 * 1000; // 12 heures en ms
/**
 * Vérifie si la session est toujours active
 * @returns bool
 */
function isTimeOut() {
	let now = Date.now();
	let sessionTime = localStorage.getItem('time');
	return parseInt(sessionTime) + apiSessionTime < now;
}

/**
 * Récupère le temps de session restant en ms
 */
function forceReconnectionWhenTokenInvalid(dispatch) {
	let now = Date.now();
	let sessionTime = parseInt(localStorage.getItem('time'));
	let token = localStorage.getItem('token');
	let sessionValidUntil = sessionTime + apiSessionTime;
	let remainingTime = sessionValidUntil - now;
	if (
		isNaN(remainingTime) ||
		sessionTime === undefined ||
		sessionTime === null ||
		sessionTime <= 0 ||
		token === undefined ||
		token === null ||
		token === '' ||
		remainingTime < 60000
	) {
		dispatch(getConnexionAsync());
	}
}

/**
 * Retourne true si la variable n'est pas définie, si elle est égale à null ou si elle est vide
 * @param {*} value
 * @returns bool
 */
const isEmpty = (value) => {
	return (
		typeof value === 'undefined' ||
		value === undefined ||
		value === null ||
		value === '' ||
		(typeof value === 'object' && Object.keys(value).length === 0) ||
		(typeof value === 'string' && value.trim().length === 0) ||
		(typeof value === 'Date' && !Date.parse(value))
	);
};

/**
 * Formate un objet date en string au format JJ-MM-YY
 * @param {Date} date
 * @returns string
 */
const convertDateToLocaleStringFr = (date) => {
	if (date instanceof Date && isFinite(date)) {
		return date.toLocaleDateString('fr', {
			year: '2-digit',
			month: '2-digit',
			day: '2-digit',
		});
	} else {
		return '';
	}
};

const classNames = (...classes) => {
	return classes.filter(Boolean).join(' ');
};

const matchRegexp = (regexp, value) => {
	let regex = new RegExp(regexp);
	return regex.test(value);
};

export {
	isTimeOut,
	forceReconnectionWhenTokenInvalid,
	isEmpty,
	convertDateToLocaleStringFr,
	classNames,
	matchRegexp,
};
