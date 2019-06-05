import { normalize } from 'normalizr';
import { API_ROOT } from '../config';
import { CALL_API } from '../constants/api';
import pathToRegexp from 'path-to-regexp';

const callApi = async (endpoint, schema, method = 'GET', headers = {}, body = null, params = {}, queries = {}) => {
	let url = new URL(`${API_ROOT}${pathToRegexp.compile(endpoint)(params)}`);
	url.search = new URLSearchParams(queries);

	const apiOptions = {
		method: method,
		mode: 'cors',
		//credentials: 'same-origin',
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
			if (!schema) {
				return result;
			}

			if (result.count !== undefined && result.rows) {
				const data = normalize(result.rows, schema);

				return { ...data, count: result.count };
			}
			return normalize(result, schema);
		} else {
			throw new Error(response.statusText || `Fetching data wasn't successfull`);
		}
	} catch (error) {
		throw error;
	}
};

const apiMiddleware = ({ dispatch, getState }) => next => action => {
	const callAPI = action[CALL_API];

	if (typeof callAPI === 'undefined') {
		return next(action);
	}

	let { endpoint, method, headers, body, params, queries } = callAPI;
	const { type, schema } = callAPI;

	const state = getState();
	const token = state.user && state.user.authToken;

	if (token) {
		headers = {
			authorization: `Bearer ${token}`
		}
	}

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

	dispatch(actionWith({ type: type }));

	return callApi(endpoint, schema, method, headers, body, params, queries)
		.then(response => dispatch(actionWith({
			payload: response,
			type: type + '_FULFILLED'
		})))
		.catch(error => dispatch(actionWith({
			type: type + '_REJECTED',
			payload: {
				error: error && error.message || 'Something bad happened'
			}
		})));
};

export default apiMiddleware;
