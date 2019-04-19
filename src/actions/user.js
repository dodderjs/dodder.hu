import Schemas from '../schemas';
import USER from '../constants/user';
import apiDispatch from './api';

export const fetchUser = apiDispatch({
	type: USER.FETCH,
	schema: Schemas.USER,
	endpoint: `/user/me`
});

export function logoutUser() {
	return {
		type: USER.LOGOUT_USER
	};
}

export function login() {
	return {
		type: USER.LOGIN_USER
	};
}
