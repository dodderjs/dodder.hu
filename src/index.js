import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import storeFactory, { history } from './store';
import Routes from './components/routes';

//require('../favicon.ico'); // Tell webpack to load favicon.ico


const initialState = (localStorage['redux-store'])
	? JSON.parse(localStorage['redux-store'])
	: {};

const store = storeFactory(initialState);

render(
	<AppContainer>
		<Routes store={store} history={history} />
	</AppContainer>,
	document.getElementById('App'),
);

if (module.hot) {
	module.hot.accept('./components/routes', () => {
		/* eslint-disable global-require */
		const NewRoutes = require('./components/routes').default;
		/* eslint-enable global-require */
		render(
			<AppContainer>
				<NewRoutes store={store} history={history} />
			</AppContainer>,
			document.getElementById('App'),
		);
	});
}
