import USER from '../constants/user';


export const INITIAL_STATE = {
	userId: null,
	userName: null,
	status:null,
	loggedIn: false,
	authToken: null,
	isLoading: false,
	error: null
};

const user = (state = INITIAL_STATE, action) => {
	const {type, payload} = action;

	switch(type) {
	case USER.FETCH:
		return {
			...state,
			isLoading: true
		};
	case USER.FETCH_FULFILLED:
		return {
			...state, 
			userId: payload.userId,
			authToken: payload.authToken,
			userName: payload.userName,
			loggedIn: true, 
			status:'authenticated', 
			error:null, 
			isLoading: false
		};
	case USER.FETCH_REJECTED:
		return {
			...state,
			status: 'rejected',
			userId: null,
			isLoading: false
		};
	case USER.LOGOUT:
		return {
			...state, 
			status: 'loggedOut',
			userId:null, 
			error:null, 
			isLoading: false
		};

	default:
		return state;
	}
};

export default user;
