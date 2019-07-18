export const INITIAL_STATE = 'all';

const filter = (TYPE) => (state = INITIAL_STATE, action) => {
	const { type, payload } = action;

	switch (type) {
	case `${TYPE}_SET_FILTER`:
		return payload.filter || INITIAL_STATE;

	default:
		return state;
	}
};
export default filter;
