import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import App from './App';
import { store, persistor } from './app/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { HashRouter } from 'react-router-dom';
import * as Sentry from '@sentry/react';

Sentry.init({
	environment: import.meta.env.VITE_ENV,
	// TODO réactiver le bloc ci-dessous, en remplaçant l'url par celle générée pour votre projet sur sentry (suivre les instructions de sentry)
	// dsn:
	//"https://e57181648cf0cd834da26a3fbf2f1574@o4506438960545792.ingest.us.sentry.io/4506972463169536",
	// integrations: [
	//   Sentry.browserTracingIntegration(),
	//   Sentry.replayIntegration({
	// 	maskAllText: false,
	// 	blockAllMedia: false,
	//   }),
	// ],
	// Performance Monitoring
	tracesSampleRate: 1.0, //  Capture 100% of the transactions
	// Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
	tracePropagationTargets: ['localhost'],
	// Session Replay
	replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
	replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<HashRouter>
					<App />
				</HashRouter>
			</PersistGate>
		</Provider>
	</React.StrictMode>
);
