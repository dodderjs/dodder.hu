import { normalize } from 'normalizr';
import { API_ROOT } from '../config';
import { CALL_API } from '../constants/api';
import { getStoredData } from '../utils/storage';
import pathToRegexp from 'path-to-regexp';

const callApi = async (endpoint, schema, method = 'GET', headers = {}, body = null, params = {}, queries = {}) => {
	let url = new URL(pathToRegexp.compile(`${API_ROOT}${endpoint}`)(params));
	url.search = new URLSearchParams(queries);

	const apiOptions = {
		method: method,
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
			...headers
		},
		body: body && JSON.stringify(body),
		redirect: "follow", // manual, *follow, error
		referrer: "no-referrer" // no-referrer, *client
	};
	try {
		const response = await fetch(url, apiOptions);

		if (response.ok) {
			const result = await response.json();
			if (!result) {
				return {};
			}
			if (result.count && result.rows) {
				const data = normalize(result.rows, schema);

				return { ...data, count: result.count, timesamp: Date.now() };
			}
			return normalize(result, schema);
		} else {
			throw new Error(`Fetching data wasn't successfull`);
		}
	} catch (error) {
		console.log(error);
		throw error;
	}
};

const apiMiddleware = store => next => action => {
	const callAPI = action[CALL_API];

	if (typeof callAPI === 'undefined') {
		return next(action);
	}

	const state = store.getState();
	const token = state.token || state.user.token || getStoredData('authToken');

	if (token) {
		headers.authorization = `Bearer ${token}`;
	}

	let { endpoint, method, headers, body, params, queries } = callAPI;
	const { type, schema } = callAPI;

	if (typeof endpoint === 'function') {
		endpoint = endpoint(state);
	}

	if (typeof endpoint !== 'string') {
		throw new Error('Specify a string endpoint URL.');
	}

	if (typeof type !== 'string') {
		throw new Error('Expected action type to be string.');
	}

	const actionWith = (data) => {
		const finalAction = { ...action, ...data };
		delete finalAction[CALL_API];
		return finalAction;
	};

	next(actionWith({ type: type }));

	return callApi(endpoint, schema, method, headers, body, params, queries)
		.then(response => next(actionWith({
			payload: response,
			type: type + '_FULFILLED'
		})))
		.catch(error => next(actionWith({
			type: type + '_REJECTED',
			payload: {
				error: error.message || 'Something bad happened'
			}
		})));
};

export default apiMiddleware;
