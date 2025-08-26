import wretch from 'wretch';

import { dedupe } from 'wretch/middlewares';
const cerApi = wretch(import.meta.env.VITE_API_URL).middlewares([
	dedupe({
		/* Options - defaults below */
		skip: (url, opts) => opts.skipDedupe || opts.method !== 'GET',
		key: (url, opts) => opts.method + '@' + url,
		resolver: (response) => response.clone(),
	}),
]);
export { cerApi };
