import Schemas from '../schemas';
import USER from '../constants/user';
import apiDispatch from './api';
import { ENDPOINTS } from '../config';

export const fetchUser = apiDispatch({
	type: USER.FETCH,
	schema: Schemas.USER,
	endpoint: '/user/:id'
});

export function logoutUser() {
	return {
		type: USER.LOGOUT
	};
}

export const login = (email, password) => (dispatch, getState) => {
	dispatch({
		type: USER.LOGIN
	});

	return apiDispatch({
		type: USER.FETCH,
		method: 'POST',
		endpoint: ENDPOINTS.USER_LOGIN,
		body: {
			email,
			password
		}
	})(dispatch, getState);
};
export const meFromToken = (token) => (dispatch, getState) => apiDispatch({
	type: USER.VALIDATE,
	method: 'POST',
	endpoint: ENDPOINTS.USER_VALIDATE,
	body: {
		code: token
	}
})(dispatch, getState);
