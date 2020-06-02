import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';

import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store/store';
import firebase from './store/firebase';

const rrfProps = {
	firebase,
	config: {
		userProfile: 'users',
		// profileFactory: userData => ({}),
		useFirestoreForProfile: true
	},
	dispatch: store.dispatch,
	createFirestoreInstance,
};

ReactDOM.render(
	<Provider store={store}>
		<ReactReduxFirebaseProvider {...rrfProps}>
			<React.StrictMode>
				<App />
			</React.StrictMode>
		</ReactReduxFirebaseProvider>
	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
