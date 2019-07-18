export const INITIAL_STATE = {};

const queries = (TYPE) => (state = INITIAL_STATE, action) => {
	const { type, payload } = action;

	switch (type) {
	case `${TYPE}_SET_FILTER`:
		return payload.queries || INITIAL_STATE;
	default:
		return state;
	}
};
export default queries;
