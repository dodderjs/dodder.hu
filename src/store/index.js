import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import appReducer from './reducers';
import apiMiddleware from '../middlewares/api';
import { consoleMessages } from '../middlewares/consoleMessages';
import { loadStoreState, saveStoreState } from '../utils/storage';
import throttle from 'lodash/throttle';

export const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [
	reduxImmutableStateInvariant(),
	thunk,
	routerMiddleware(history),
	apiMiddleware,
	consoleMessages
];

export default (initialState = {}) => {
	const store = createStore(
		appReducer(history),
		loadStoreState(initialState),
		composeEnhancers(applyMiddleware(...middlewares))
	);

	if (module.hot) {
		module.hot.accept('./reducers', () => {
			const nextAppReducer = require('./reducers').default; // eslint-disable-line global-require
			store.replaceReducer(nextAppReducer(history));
		});
	}

	store.subscribe(throttle(() => {
		saveStoreState({
			user: store.getState().user
		})
	}));
	
	return store;
};
