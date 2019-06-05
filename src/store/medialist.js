export const INITIAL_STATE = [];

const medialist = (TYPE) => (state = INITIAL_STATE, action) => {
	const { type, payload } = action;

	switch (type) {
	case `${TYPE}_SET_FILTER`:
		return [];
	case `${TYPE}_FETCH_FULFILLED`:
		return [
			...state,
			...payload.result
		];
	default:
		return state;
	}
};

export default medialist;
