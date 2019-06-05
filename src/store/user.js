import USER from '../constants/user';


export const INITIAL_STATE = {
	userId: null,
	details: null,
	status:null,
	loggedIn: false,
	authToken: null,
	isLoading: false,
	error: null
};

const user = (state = INITIAL_STATE, action) => {
	const {type, payload} = action;

	switch(type) {
	case USER.VALIDATE:
	case USER.FETCH:
		return {
			...state,
			isLoading: true
		};
	case USER.VALIDATE_FULFILLED:
	case USER.FETCH_FULFILLED:
		return {
			...state, 
			userId: payload.user.id,
			authToken: payload.token,
			details: payload.user,
			loggedIn: true, 
			status: 'authenticated', 
			error: null, 
			isLoading: false
		};
	case USER.VALIDATE_REJECTED:
	case USER.FETCH_REJECTED:
		return {
			...state,
			status: 'rejected',
			userId: null,
			details: null,
			authToken: null,
			isLoading: false,
			loggedIn: false
		};
	case USER.LOGOUT:
		return {
			...state, 
			status: 'loggedOut',
			userId:null, 
			details: null,
			error:null, 
			isLoading: false,
			loggedIn: false
		};

	default:
		return state;
	}
};

export default user;
