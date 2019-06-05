import ERRORS from '../constants/error';

const INITIAL_STATE = [];

const errors = (state = INITIAL_STATE, action) => {
	const { type, payload } = action;

	if (type.endsWith('_REJECTED')) {
		return [
			...state,
			payload.error
		];
	}
	switch (action.type) {
	case ERRORS.ADD:
		return [
			...state,
			payload.error
		];
	case ERRORS.CLEAR:
		return state.filter((message, i) => i !== payload);
	default:
		return state;
	}
};

export default errors;
