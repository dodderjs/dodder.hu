import ERRORS from '../constants/error';

const INITIAL_STATE = {
	errors: []
};

const errors = (state = INITIAL_STATE, action) => {
	const {type, payload} = action;

	if (type.endsWith('_REJECTED')) {
		return [
			...state,
			payload
		];
	}
	switch(action.type) {
	case ERRORS.ADD :
		return [
			...state,
			payload
		];
	case ERRORS.CLEAR :
		return state.filter((message, i) => i !== payload)
	default:
		return state
	}
};

export default errors;
